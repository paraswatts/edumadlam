import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');
import { CustomTouchableIcon } from '../../atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, _scaleText } from '../../../shared';

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
        <View style={styles.mainContainer}>

            <View style={styles.innerContainer}>

                <View style={styles.dummyContainer}>

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
                    // androidVariant="nativeAndroid"
                    mode={"date"}
                    maximumDate={new Date()}
                    date={date}
                    onDateChange={onChange}
                />
                <View style={{ width: '100%', borderTopWidth: 1, height: 50, borderColor: '#d2d2d2', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: _scaleText(15).fontSize }}>
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

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "absolute",
        flex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0, zIndex: 9999999
    },
    innerContainer: {
        width: '90%',
        borderRadius: _scaleText(20).fontSize,
        backgroundColor: COLORS.GREY.LIGHTER,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dummyContainer: {
        height: _scaleText(10).fontSize,
        borderColor: '#d2d2d2',
    }
})