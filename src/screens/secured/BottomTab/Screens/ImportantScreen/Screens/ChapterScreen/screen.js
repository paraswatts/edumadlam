import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS, appleInAppPurchase } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import FastImage from 'react-native-fast-image';
import styles from './styles'
import moment from 'moment'
import { isTablet } from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    netConnected,
    importantChapterListRequest,
    completeStorePayment,
    generatePaymentLinkRequest,
    startLoading,
    stopLoading,
    route: { name, params: { _id, _category } = {} },
    sId
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())

    const selectDate = (date) => {
        updateSelectedDate(date)
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateDate(selectedDate)
    }
    useEffect(() => { fetchData(true) }, [])


    const fetchData = (refresh = false) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
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
        importantChapterListRequest(payload)
    }
    useEffect(() => {
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })
    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)


    const fetchPaymentPage = (paymentObj) => {
        if (sId) {
            console.log("paymentObj", paymentObj)
            toggleLoading(true);
            let payload = {
                netConnected,
                amount: paymentObj.amount,
                purpose: paymentObj.purpose.replace(/\s+/g, ''),
                sId,
                type: paymentObj.type,
                productId: paymentObj.productId,
                success: (response = []) => {
                    let res = response && response.length && response[0]
                    if (res && res.status && res.status == 1) {
                        let _webPage = res && res.response
                        navigation.navigate(ROUTES.TEST.PAYMENT_SCREEN, { _webPage: _webPage })
                    }

                    toggleLoading(false);
                },
                fail: (message = '') => {
                    console.log("herer")
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

    const applePayments = async (paymentObj) => {
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
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={_category}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        // headerRight={ICONS.CALENDAR}
        >

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
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _catName, _imgUrl, _name, _price, _productId } = item;
                    let paymentObj = { amount: _price, purpose: _category, id: _id, productId: _productId, type: 'importantChapter' }
                    console.log("_price chapter", item)
                    return (<View
                        style={{

                            flexDirection: 'column',
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: _scaleText(10).fontSize, marginVertical: 5,
                            elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <TouchableOpacity style={{ borderWidth: 0, flex: 1, flexDirection: 'row' }} onPress={() => navigation.navigate(ROUTES.IMPORTANT.POST_LIST, { _id: _id, _category: _name, _price: _price, _productId: _productId })}>
                            {_imgUrl ?
                                <FastImage

                                    resizeMode='contain'
                                    source={{ uri: _imgUrl }}
                                    style={{
                                        width: _scaleText(60).fontSize, height: '100%', borderTopLeftRadius: _scaleText(10).fontSize,
                                        borderBottomLeftRadius: _scaleText(10).fontSize
                                    }}
                                >
                                </FastImage> : null}
                            <View style={{ borderWidth: 0, flex: 1 }}>
                                <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(12).fontSize, fontWeight: '500', flex: 1, padding: _scaleText(20).fontSize, }}>{_name}</Text>
                                <Text style={{ fontWeight: '500', marginLeft: _scaleText(20).fontSize, fontSize: _scaleText(12).fontSize, marginTop: 10, color: COLORS.BLUE_FONT }}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginLeft: _scaleText(20).fontSize, flexDirection: 'row', justifyContent: 'space-between', marginTop: _scaleText(16).fontSize }}>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.IMPORTANT.POST_LIST, { _id: _id, _category: _name, _price: _price, _productId: _productId })} style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.VIEW}</Text>
                                <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                            </TouchableOpacity>{parseInt(_price) > 0 ? <TouchableOpacity onPress={() =>

                                Platform.OS === 'android' ? fetchPaymentPage(paymentObj) : applePayments(paymentObj)} style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                                <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                            </TouchableOpacity> : null}
                        </View>

                    </View>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default FriendsScreen;