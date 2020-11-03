import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');
import { CustomTouchableIcon } from '../../atoms';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({
    closeDatePicker,
    selectDate,
    doneClick,
    selectedDate
}) => {
    const [date, setDate] = useState(selectedDate || new Date())
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        selectDate(currentDate)
        setDate(currentDate);
    };

    const onChangeAndroid = (event, selectedDate) => {
        Alert.alert(
            'Exit Test',
            'If you exit the test will be submitted',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        fetchData(true)
                        updateShowDate(false)
                    }
                },
                {
                    text: 'No',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
        const currentDate = selectedDate || date;
        selectDate(currentDate)
        setDate(currentDate);
    };

    return (
        // Platform.OS === 'ios' ?
        <View style={{ position: "absolute", flex: 1, bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center', borderWidth: 5, zIndex: 9999999, }}>
            <View style={{ bottom: 0, width: width, backgroundColor: 'white', alignSelf: 'center', }}>
                <View style={{ borderBottomWidth: 1, height: 50, borderTopWidth: 1, borderColor: '#d2d2d2', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                    <CustomTouchableIcon
                        onPress={closeDatePicker}
                    >
                        <Text style={{ color: '#626262' }}>Cancel</Text>
                    </CustomTouchableIcon>
                    <CustomTouchableIcon
                        onPress={doneClick}
                    >
                        <Text style={{ color: 'blue' }}>Done</Text>
                    </CustomTouchableIcon>
                </View>
                {/* <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                /> */}
                <DatePicker
                    mode={"date"}
                    maximumDate={new Date()}
                    date={date}
                    onDateChange={onChange}
                />
            </View>
        </View>
        // : <DateTimePicker
        //     testID="dateTimePicker"
        //     value={date}
        //     mode={"date"}
        //     is24Hour={true}
        //     display="default"
        //     maximumDate={new Date()}
        //     onChange={onChange}
        // />
    );
}
export default CustomDatePicker;