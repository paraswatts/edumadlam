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
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, borderWidth: 10 }}
        // headerRight={ICONS.CALENDAR}
        // onRightPress={() => updateShowDate(true)}
        >

            {/* <CustomMCQModal questionsObj={questionsObj} /> */}
            {/* {
                showDate &&
                <CustomDatePicker closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} />
            } */}
            <View style={styles.dailyMcqContainer}>

                <FastImage
                    style={styles.mcqImage}
                    resizeMode={'stretch'}
                    source={{ uri: 'https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/wp6ojoyuh6fwdidy_1598513829.jpeg?tr=w-812,h-464' }}
                />

                <CustomButton onPress={() => navigation.navigate(ROUTES.DAILY_MCQ.QUIZ_SCREEN)} label={TEXT_CONST.START_DAILY_QUIZ} labelSize={_scaleText(14).fontSize} labelStyle={styles.mcqLabel} container={styles.mcqButton}></CustomButton>

            </View>
        </ScreenHOC >
    );
}

export default FriendsScreen;
