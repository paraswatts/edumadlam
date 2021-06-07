import React from 'react'
import { TouchableOpacity, View, Text, Linking, StyleSheet, Platform } from 'react-native'
import { COLORS, _scaleText, ROUTES, TEXT_CONST } from '../../../shared'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { isTablet } from 'react-native-device-info';
const CustomTestItem = ({ applePayments, _imgUrl, clickable, fetchPaymentPage, _id, _name, _price, _timestamp, _startDate, _endDate, _timetable, navigation, purchased, _webPage, _productId }) => {
    const goToPaymentScreen = () => {
        let paymentObj = {
            amount: _price,
            purpose: _name,
            type: 'testSeries',
            id: _id,
            productId: _productId
        }
        if (Platform.OS === 'ios') {
            applePayments(paymentObj)
        }
        else {
            fetchPaymentPage(paymentObj)
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