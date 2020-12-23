import React from 'react'
import { TouchableOpacity, View, Text, Linking, StyleSheet } from 'react-native'
import { COLORS, _scaleText, ROUTES, TEXT_CONST } from '../../../shared'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTestItem = ({ fetchPaymentPage, _id, _name, _price, _timestamp, _startDate, _endDate, _timetable, navigation, purchased, _webPage }) => {
    const goToPaymentScreen = () => {
        let paymentObj = {
            amount: _price,
            purpose: _name,
            type: 'testSeriesList',
            productId: _id
        }
        fetchPaymentPage(paymentObj)
    }

    renderBody(){
        return (
<Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.NAME}</Text>{_name}</Text>
            <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>
            <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.START_DATE}</Text>{_startDate}</Text>
            <Text style={styles.fontItem}><Text style={styles.fontBold}>{TEXT_CONST.END_DATE}</Text>{_endDate}</Text>
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
                {_webPage ? <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.TEST_DETAIL, { _webPage: _webPage, _heading: _name })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                    <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>{TEXT_CONST.VIEW}</Text>
                    <Ionicons name="arrow-forward-circle-outline" size={18} color='blue' />
                </TouchableOpacity> : null}
                {!purchased && parseInt(_price) &&
                    <TouchableOpacity onPress={goToPaymentScreen} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                        <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                        <Ionicons name="arrow-forward-circle-outline" size={18} color='blue' />
                    </TouchableOpacity>}
            </View>
        )
    }
return (
    <View
        style={{
            shadowColor: '#b2b2b2',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
        }}>


    </View>
)
}
export default CustomTestItem
const styles = StyleSheet.create({
    fontBold: {
        fontWeight: 'bold'
    },
    fontItem: {
        fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10,
        color: COLORS.BLUE_FONT
    },
    fontBlue: {
        color: 'blue'
    }
})