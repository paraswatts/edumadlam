import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');
import { CustomTouchableIcon } from '../../atoms';

const CustomDatePicker = ({
    closeDatePicker = () => { },
    selectDate = () => { }
}) => {
    const [date, setDate] = useState(new Date())

    return (
        <View style={{ position: "absolute", bottom: 80, width: width, }}>
            <View style={{ borderBottomWidth: 1, height: 50, borderTopWidth: 1, borderColor: '#d2d2d2', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <CustomTouchableIcon
                    onPress={closeDatePicker}
                >
                    <Text style={{ color: '#626262' }}>Cancel</Text>
                </CustomTouchableIcon>
                <CustomTouchableIcon
                    onPress={closeDatePicker}
                >
                    <Text style={{ color: 'blue' }}>Done</Text>
                </CustomTouchableIcon>
            </View>
            <DatePicker
                maximumDate={new Date()}
                style={{ alignSelf: 'center' }}
                date={date}
                mode="date"
            //   onDateChange={setDate}
            />
        </View>
    );
}
export default CustomDatePicker;