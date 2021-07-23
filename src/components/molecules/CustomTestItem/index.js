import React from 'react'
import { TouchableOpacity, View, Text, Linking, StyleSheet, Platform, Alert } from 'react-native'
import { COLORS, _scaleText, ROUTES, TEXT_CONST, _showCustomToast } from '../../../shared'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { isTablet } from 'react-native-device-info';
import prompt from 'react-native-prompt-android'
const CustomTestItem = ({ sId, verifyPromo, toggleLoading, netConnected, applePayments, _imgUrl, clickable, fetchPaymentPage, _id, _name, _dPrice, _price, _timestamp, _startDate, _endDate, _timetable, navigation, purchased, _webPage, _productId }) => {
    const goToPaymentScreen = () => {
        let paymentObj = {
            amount: _price,
            purpose: _name,
            type: 'testSeries',
            id: _id,
            productId: _productId
        }
        let discountedObj = {
            amount: _dPrice,
            purpose: _name,
            type: 'testSeries',
            id: _id,
            productId: _productId
        }
        buyPackage('', paymentObj, discountedObj)
    }

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

    const renderBody = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {_imgUrl ?
                    <FastImage

                        resizeMode='contain'
                        source={{ uri: _imgUrl }}
                        style={{
                            width: _scaleText(80).fontSize, height: '100%', borderTopLeftRadius: _scaleText(10).fontSize,
                            borderBottomLeftRadius: _scaleText(10).fontSize
                        }}
                    >
                    </FastImage> : null}
                <View style={{ flex: 1, marginLeft: _scaleText(10).fontSize }}>


                    <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.NAME}</Text>{_name}</Text>
                    <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>
                    <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.START_DATE}</Text>{_startDate}</Text>
                    {/* <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.END_DATE}</Text>{_endDate}</Text> */}
                    {
                        !!_timetable && <TouchableOpacity onPress={() => {
                            try {
                                Linking.openURL(_timetable)
                            } catch (error) {
                                console.log("error", error)
                            }
                        }}><Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.TIMETABLE}</Text><Text style={styles.fontBlue}>{"Timetable"}</Text></Text>
                        </TouchableOpacity>
                    }
                    <Text style={{ textAlign: 'right', bottom: 5, right: 10, position: 'absolute', marginTop: 20, fontSize: 10 }}>{_timestamp}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {_webPage ? <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.TEST_DETAIL, { _webPage: _webPage, _heading: _name })}
                            style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                            <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>{TEXT_CONST.VIEW}</Text>
                            <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                        </TouchableOpacity> : null}
                        {!purchased && parseInt(_price) &&
                            <TouchableOpacity onPress={goToPaymentScreen} style={{ padding: 10, borderWidth: 0, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                                <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        )
    }
    return (
        !clickable ? <View
            style={{
                flex: 1,
                shadowColor: '#b2b2b2',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
            }}>

            {renderBody()}
        </View> :
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.TEST.PURCHASED_TESTS, { catId: _id, _name: _name })}
                    style={{
                        shadowColor: '#b2b2b2',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                    }}>

                    {renderBody()}
                </TouchableOpacity>
            </View>
    )
}
export default CustomTestItem
const styles = StyleSheet.create({
    fontBold: {
        fontWeight: 'bold',
        fontSize: _scaleText(12).fontSize
    },
    fontItem: {
        fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10,
        color: COLORS.BLUE_FONT,
        fontSize: _scaleText(12).fontSize
    },
    fontBlue: {
        color: 'blue',
        fontSize: _scaleText(12).fontSize
    }
})