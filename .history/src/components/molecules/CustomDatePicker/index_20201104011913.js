import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window');
import { CustomTouchableIcon } from '../../atoms';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, TEXT_CONST, _scaleText } from '../../../shared';

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
    return (
        <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.dummyContainer}>
                </View>
                <DatePicker
                    style={{ backgroundColor: COLORS.GREY.LIGHTER }}
                    fadeToColor={COLORS.GREY.LIGHTER}
                    mode={"date"}
                    maximumDate={new Date()}
                    date={date}
                    onDateChange={onChange}
                />
                <View style={styles.buttonContainer}>
                    <CustomTouchableIcon
                        onPress={closeDatePicker}
                    >
                        <Text style={{ color: '#626262' }}>{TEXT_CONST.CANCEL}</Text>
                    </CustomTouchableIcon>
                    <CustomTouchableIcon
                        onPress={doneClick}>
                        <Text style={{ color: 'blue' }}>{TEXT_CONST.DONE}</Text>
                    </CustomTouchableIcon>
                </View>
            </View>
        </View>
    )
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
        borderRadius: _scaleText(10).fontSize,
        backgroundColor: COLORS.GREY.LIGHTER,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dummyContainer: {
        height: _scaleText(20).fontSize
    },
    buttonContainer: {
        width: '100%',
        borderTopWidth: 1,
        height: _scaleText(50).fontSize,
        borderColor: '#d2d2d2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: _scaleText(15).fontSize
    }
})