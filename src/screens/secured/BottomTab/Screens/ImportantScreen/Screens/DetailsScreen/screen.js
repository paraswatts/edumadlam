import React, { useState, useEffect } from 'react';
import { Alert, Text, View, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, BackHandler, Dimensions, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, appleInAppPurchase, ROUTES } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import momemt from 'moment'
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';
import HTML from "react-native-render-html";
import prompt from 'react-native-prompt-android';

const INJECTEDJAVASCRIPT = `<style>body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
    </style>
  `;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const ImportantDetailScreen = ({
    navigation,
    netConnected,
    importantDetailRequest,
    route: { name, params: { _id, _heading } = {} },
    sId: sId,
    stopLoading,
    completeStorePayment,
    generatePaymentLinkRequest,
    startLoading,
    verifyPromo
}) => {
    const [loading, toggleLoading] = useState(false);
    const [data, updateData] = useState(false);
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        toggleLoading(true);
        let payload = {
            netConnected,
            id: _id,
            sId: sId,
            success: (response = []) => {
                console.log("response", response)
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        importantDetailRequest(payload)
    }

    const replaceString = (str) => {
        let _questUpdated = str.replace(/(\r\n|\n|\r)/gm, "")
        _questUpdated = _questUpdated.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
        _questUpdated = _questUpdated.replace(/<[^/>][^>]*><\/[^>]+>/g, "")
        return _questUpdated
    }

    useEffect(() => {
        return () => {
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
                    fetchData(true)
                    toggleLoading(false);
                    stopLoading()
                },
                fail: (message = '') => {
                    stopLoading()
                    _showCustomToast({ message });
                    toggleLoading(false);

                }
            }
            console.log(payload)
            completeStorePayment(payload)
        }

        else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }

    const buyPackage = (paymentObj, discountedObj) => {
        if (sId) {

            Alert.alert(
                "Do you have a coupon code?",
                "",
                [
                    {
                        text: "No",
                        onPress: () => Platform.OS === 'ios' ? applePayments(paymentObj) : fetchPaymentPage(paymentObj),
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Alert.prompt('Enter coupon code', '', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'OK',
                                        onPress: promoCode => verifyPromoCode(promoCode, discountedObj, paymentObj)
                                    },
                                ]);
                            } else {
                                prompt(
                                    'Enter coupon code',
                                    '',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'OK',
                                            onPress: promoCode => verifyPromoCode(promoCode, discountedObj, paymentObj)
                                        },
                                    ],
                                    {
                                        cancelable: true,
                                        defaultValue: '',
                                        placeholder: '',
                                    },
                                )
                            }
                        }
                    },
                ],
            );
        } else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }
    const verifyPromoCode = (promoCode, discountedObj, paymentObj) => {
        console.log(discountedObj, "promoCode", paymentObj)
        let payload = {
            netConnected,
            promoCode,
            success: (response = []) => {
                console.log("hello")

                if (discountedObj.amount === paymentObj.amount) {
                    Alert.alert(
                        "We are already giving you best rate possible",
                        "",
                        [
                            {
                                text: "Ok",
                                onPress: () => { },
                                style: "cancel",
                            },
                        ],
                        {
                            cancelable: true
                        }
                    );
                }
                else {
                    if (Platform.OS === 'ios') {
                        applePayments(discountedObj)
                    }
                    else {
                        console.log("hererererrerer")
                        fetchPaymentPage(discountedObj)
                    }
                }
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        verifyPromo(payload)
    }
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.WHITE, }}
            headerTitle={_heading}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >
            {data && data.length &&
                <View style={{ padding: _scaleText(10).fontSize, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: _scaleText(16).fontSize }}>{data[0]._heading}</Text>

                    <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: _scaleText(10).fontSize }}>{data[0]._timestamp}</Text>

                    <FastImage
                        style={{ height: 150 }}
                        resizeMode={'contain'}
                        source={{ uri: data[0]._imgUrl }}
                    />
                    {data[0]._price.length ? <TouchableOpacity onPress={() => {
                        let paymentObj = { amount: data[0]._price, purpose: data[0]._chapterName, id: data[0]._id, productId: data[0]._productId, type: 'importantChapter' }
                        let discountedObj = { amount: data[0]._dPrice, purpose: data[0]._chapterName, id: data[0]._id, productId: data[0]._productId, type: 'importantChapter' }
                        buyPackage(paymentObj, discountedObj)
                    }}><Text style={{ alignSelf: 'flex-start', textDecorationLine: 'underline', color: 'blue', padding: 10 }}>Buy</Text></TouchableOpacity> : null}


                    {data[0]._pdf.length ? <TouchableOpacity onPress={() => {
                        try {
                            Linking.openURL(data[0]._pdf)
                        } catch (error) {
                            console.log("error", error)
                        }
                    }}><Text style={{ alignSelf: 'flex-start', textDecorationLine: 'underline', color: 'blue', padding: 10 }}>Download PDF</Text></TouchableOpacity> : null}
                    {/* <View style={{ marginHorizontal: _scaleText(10).fontSize }}> */}
                    {/* <HTML imagesMaxWidth={Dimensions.get('window').width} tagsStyles={styles} source={{ html: replaceString(data[0]._important) }} /> */}
                    <WebView
                        showsVerticalScrollIndicator={false}

                        source={{ html: INJECTEDJAVASCRIPT + '<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0">' + data[0]._important }} style={{ flex: 1, borderWidth: 0 }} />
                    {/* <HTMLView stylesheet={styles} addLineBreaks={true} value={data[0]._important.replace(/(\r\n|\n|\r)/gm, "")} /> */}
                    {/* <WebView source={{ html: data[0]._important.replace("\n", "") }} /> */}
                    {/* </View> */}
                </View>}
            {loading && <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color={COLORS.GREY._2}
                />
            </View>}

        </ScreenHOC>
    );
}

const styles = StyleSheet.create({
    a: {
        color: COLORS.BLUE_FONT, // make links coloured pink,
        fontSize: _scaleText(12).fontSize
    },
    p: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h1: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h2: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h3: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h4: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h5: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h6: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
});

export default ImportantDetailScreen;