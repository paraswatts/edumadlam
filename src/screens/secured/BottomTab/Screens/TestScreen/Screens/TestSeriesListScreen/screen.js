import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View, BackHandler, Alert, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomTestItem } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, appleInAppPurchase } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isTablet } from 'react-native-device-info';
import prompt from 'react-native-prompt-android';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesList = ({
    navigation,
    netConnected,
    testSeriesListRequest,
    route: { params: { _id, _category, _price, _dPrice, _productId } = {} },
    generatePaymentLinkRequest,
    sId,
    stopLoading,
    startLoading,
    completeStorePayment,
    verifyPromo
}) => {
    console.log("_id, _category, _price, _productId", _id, _category, _price, _productId)
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            catId: _id,
            success: (response = []) => {
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        testSeriesListRequest(payload)
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
    const fetchPaymentPage = (paymentObj, promoCode) => {
        if (sId) {
            toggleLoading(true);
            let payload = {
                netConnected,
                amount: paymentObj.amount,
                purpose: paymentObj.purpose.replace(/\s+/g, ''),
                sId,
                type: paymentObj.type,
                productId: paymentObj.id,
                promoCode,
                success: (response = []) => {
                    let res = response && response.length && response[0]
                    console.log("res", res)
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
        } else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)

        }
    }

    const applePayments = async (paymentObj, promoCode) => {
        console.log("paymentObj", paymentObj)
        if (sId) {
            startLoading()
            setTimeout(() => {
                stopLoading()
            }, 1000)
            let paymentResponse = await appleInAppPurchase(paymentObj.productId);

            console.log(paymentResponse.transactionId, "paymentResponse", paymentResponse)
            let payload = {
                netConnected,
                amount: paymentObj.amount,
                paymentMode: 'appleStore',
                sId,
                type: paymentObj.type,
                productId: paymentObj.id,
                transactionId: paymentResponse.transactionId,
                timestamp: paymentResponse.transactionDate,
                promoCode,
                success: (response = []) => {
                    console.log(response, "apple payment")
                    Alert.alert("Purchase Successful")
                    if (paymentObj.type === 'testCategory') {
                        navigation.navigate(ROUTES.TEST.PURCHASED_SERIES)
                    }
                    else {
                        navigation.navigate(ROUTES.TEST.PURCHASED_TESTS)
                    }
                    toggleLoading(false);
                    stopLoading()
                },
                fail: (message = '') => {
                    stopLoading()
                    _showCustomToast({ message });
                    toggleLoading(false);
                    toggleRefreshing(false);

                }
            }
            console.log(payload)
            completeStorePayment(payload)
        }

        else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
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
                                applePayments(paymentObj, promoCode)
                            }
                            else {
                                fetchPaymentPage(paymentObj, promoCode)
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
                        applePayments(discountedObj, promoCode)
                    }
                    else {
                        _showCustomToast({ message: 'Promocode has been applied successfully', type: 'success', position: 'top' });
                        fetchPaymentPage(discountedObj, promoCode)
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
            headerTitle={_category}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >
            <View style={{
                backgroundColor: 'white', elevation: 5, shadowColor: '#b2b2b2',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                alignItems: 'center',
                shadowRadius: 1, padding: _scaleText(10).fontSize, flexDirection: 'row', justifyContent: 'space-between'
            }}><Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: _scaleText(12).fontSize }} > {_category}</Text>
                {parseInt(_price) ?
                    <TouchableOpacity onPress={() => {
                        console.log("_productId", _productId)
                        let paymentObj = { amount: _price, productId: _productId, id: _id, type: 'testCategory', purpose: _category }
                        let discountedObj = { amount: _dPrice, productId: _productId, id: _id, type: 'testCategory', purpose: _category }
                        buyPackage('', paymentObj, discountedObj)
                    }
                    }
                        style={{ padding: 10, borderWidth: 0, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                        <Text style={[styles.fontBlue, {
                            fontSize: _scaleText(12).fontSize, textAlign: 'right', marginRight: _scaleText(5).fontSize
                        }]}>{TEXT_CONST.PURCHASE}</Text>
                        <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                    </TouchableOpacity> : null}
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                numColumns={isTablet() ? 2 : 1}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => fetchData(true)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    return (<CustomTestItem sId={sId} toggleLoading={toggleLoading} fetchPaymentPage={fetchPaymentPage} netConnected={netConnected} applePayments={applePayments} {...item} navigation={navigation} verifyPromo={verifyPromo} />)
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC>
    );
}

export default TestSeriesList;