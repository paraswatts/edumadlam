import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler, View, Platform, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS, appleInAppPurchase } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { isTablet } from 'react-native-device-info';
import * as Sentry from "@sentry/react-native";
import prompt from 'react-native-prompt-android';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesListScreen = ({
    navigation,
    netConnected,
    testCatListRequest,
    generatePaymentLinkRequest,
    sId,
    selectedStream,
    route: { name, params: { id, } = {} },
    stopLoading,
    completeStorePayment,
    authToken,
    startLoading,
    verifyPromo
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [_id, updateId] = useState(selectedStream ? selectedStream : id)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())

    const selectDate = (date) => {
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateSelectedDate(date)
        updateDate(selectedDate)
    }
    const updateStream = (_id) => {
        updateId(_id)
        fetchData(true, _id, date)
    }
    useEffect(() => { fetchData(true, selectedStream, date) }, [])
    useEffect(() => { fetchData(true, selectedStream, date) }, [selectedStream])
    const fetchData = (refresh = false, _id, date) => {
        console.log("fetch Data")
        toggleLoading(!refresh);
        toggleRefreshing(refresh);
        let payload = {
            netConnected,
            _id,
            success: (response = []) => {
                updateData(refresh ? [...response] : [...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        testCatListRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })
    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleValidateClose
        );
        return () => handler.remove();
    }, []);
    const handleValidateClose = () => {
        /* Here is empty */
        stopLoading();
    };
    const fetchPaymentPage = (paymentObj) => {
        console.log("paymentObj", paymentObj)
        if (authToken) {
            toggleLoading(true);
            let payload = {
                netConnected,
                amount: paymentObj.amount,
                purpose: paymentObj.purpose.replace(/\s+/g, ''),
                sId,
                type: 'testCategory',
                productId: paymentObj.id,
                success: (response = []) => {
                    let res = response && response.length && response[0]
                    if (res && res.status && res.status == 1) {
                        let _webPage = res && res.response
                        navigation.navigate(ROUTES.TEST.PAYMENT_SCREEN, { _webPage: _webPage })
                    }
                    toggleLoading(false);
                },
                fail: (message = '') => {
                    _showCustomToast({ message });
                    toggleLoading(false);
                    toggleRefreshing(false);
                }
            }
            generatePaymentLinkRequest(payload)
        }
        else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)

        }

    }

    const applePayments = async (paymentObj) => {
        if (authToken) {
            startLoading()
            setTimeout(() => {
                stopLoading()
            }, 1000)
            let paymentResponse = await appleInAppPurchase(paymentObj.productId);

            stopLoading()
            console.log(paymentResponse.transactionId, "paymentResponse", paymentResponse)
            let payload = {
                netConnected,
                amount: paymentObj.amount,
                paymentMode: 'appleStore',
                sId,
                type: 'testCategory',
                productId: paymentObj.id,
                transactionId: paymentResponse.transactionId,
                timestamp: paymentResponse.transactionDate,
                success: (response = []) => {
                    console.log(response, "apple payment")
                    Alert.alert("Purchase Successful")
                    navigation.navigate(ROUTES.TEST.PURCHASED_SERIES)
                    toggleLoading(false);
                    stopLoading()
                },
                fail: (message = '') => {
                    _showCustomToast({ message });
                    toggleLoading(false);
                    toggleRefreshing(false);
                    stopLoading()
                }
            }
            console.log(payload)
            completeStorePayment(payload)
        } else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }
    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)

    const buyPackage = (promoCodeValue, paymentObj, discountedObj) => {
        if (sId) {
            if (Platform.OS === 'ios') {
                Alert.prompt('Enter coupon code', '', [
                    {
                        text: 'Skip',
                        onPress: () => Platform.OS === 'ios' ? applePayments(paymentObj) : fetchPaymentPage(paymentObj),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: promoCode => verifyPromoCode(promoCode, discountedObj, paymentObj)
                    },
                ], 'plain-text', promoCodeValue);
            } else {
                prompt(
                    'Enter coupon code',
                    '',
                    [
                        {
                            text: 'Skip',
                            onPress: () => Platform.OS === 'ios' ? applePayments(paymentObj) : fetchPaymentPage(paymentObj),
                            style: 'cancel',
                        },
                        {
                            text: 'OK',
                            onPress: promoCode => verifyPromoCode(promoCode, discountedObj, paymentObj)
                        },
                    ],
                    {
                        cancelable: true,
                        defaultValue: promoCodeValue,
                        placeholder: '',
                    },
                )
            }

        } else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }

    const verifyPromoCode = (promoCode, discountedObj, paymentObj) => {
        if (discountedObj.amount === paymentObj.amount) {
            Alert.alert(
                "We are already giving you best rate possible",
                "",
                [
                    {
                        text: "Ok",
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                applePayments(paymentObj)
                            }
                            else {
                                fetchPaymentPage(paymentObj)
                            }
                        },
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true
                }
            );
        } else {
            let payload = {
                netConnected,
                promoCode,
                success: (response = []) => {
                    if (Platform.OS === 'ios') {
                        _showCustomToast({ message: 'Promocode has been applied successfully', type: 'success', position: 'center' });
                        applePayments(discountedObj)
                    }
                    else {
                        _showCustomToast({ message: 'Promocode has been applied successfully', type: 'success', position: 'top' });
                        fetchPaymentPage(discountedObj)
                    }
                    toggleLoading(false);
                },
                fail: (message = '') => {
                    buyPackage(promoCode, paymentObj, discountedObj)
                    if (Platform.OS === 'ios') {
                        _showCustomToast({ message, position: 'center' });
                    }
                    else {
                        _showCustomToast({ message, position: 'top' });
                    }
                    toggleLoading(false);
                }
            }
            verifyPromo(payload)
        }
    }


    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={TEXT_CONST.TEST_SERIES_LIST}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
            changeFilter={(id) => updateStream(id)}
            showFilter
        >
            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={() => {
                        fetchData(true, 1, date)
                        updateShowDate(false)
                    }} />
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => fetchData(true)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                numColumns={isTablet() ? 1 : 1}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _category, _price, _imgUrl, _productId, _dPrice } = item;
                    let paymentObj = { amount: _price, purpose: _category, id: _id, productId: _productId }
                    let discountedObj = { amount: _dPrice, purpose: _category, id: _id, productId: _productId }

                    console.log("item", item)
                    return (<View
                        style={{
                            flex: 1,
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            flexDirection: 'row',
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        {_imgUrl ?
                            <FastImage

                                resizeMode='contain'
                                source={{ uri: _imgUrl }}
                                style={{
                                    width: _scaleText(80).fontSize, height: '100%', borderTopLeftRadius: _scaleText(10).fontSize,
                                    borderBottomLeftRadius: _scaleText(10).fontSize
                                }}
                            >
                            </FastImage> : null}<View style={{ padding: _scaleText(20).fontSize, flex: 1 }}>
                            <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: _scaleText(14).fontSize }}>{_category}</Text>
                            <Text style={{ fontWeight: '500', fontSize: _scaleText(12).fontSize, marginTop: 10, color: COLORS.BLUE_FONT }}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: _scaleText(16).fontSize }}>
                                {<TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.LIST, { _id: _id, _category: _category, _price: _price, _dPrice: _dPrice, _productId })} style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.VIEW}</Text>
                                    <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                                </TouchableOpacity>}{parseInt(_price) > 0 ? <TouchableOpacity onPress={() =>

                                    buyPackage('', paymentObj, discountedObj)} style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                                    <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                                </TouchableOpacity> : null}
                            </View>
                        </View>
                    </View>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default TestSeriesListScreen;