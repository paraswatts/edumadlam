import React, { useState, useRef } from 'react';
import { Text, UIManager, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { ScreenHOC, CustomButton, CustomDatePicker, CustomMCQModal } from '../../../../../components';
import { COLORS, ICONS, _scaleText, TEXT_CONST, ROUTES } from '../../../../../shared';
import styles from './styles';
import { isTablet } from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
export const { width, height } = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    const [showDate, updateShowDate] = useState(false)
    const selectDate = (date) => {
        console.log("hete", date)
    }
    return (
        <ScreenHOC
            headerTitle={'Daily MCQ'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        // headerRight={ICONS.CALENDAR}
        // onRightPress={() => updateShowDate(true)}
        >

            {/* <CustomMCQModal questionsObj={questionsObj} /> */}
            {/* {
                showDate &&
                <CustomDatePicker closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} />
            } */}
            <View style={{ height: width * 3 / 4, borderWidth: 1, margin: _scaleText(10).fontSize }}>

                <FastImage
                    style={{ height: 150 }}
                    resizeMode={'contain'}
                    source={{ uri: 'https://www.tatacliq.com/que/wp-content/uploads/2020/03/shutterstock_749036344.jpg' }}
                />
            </View>
        </ScreenHOC >
    );
}

export default FriendsScreen;
