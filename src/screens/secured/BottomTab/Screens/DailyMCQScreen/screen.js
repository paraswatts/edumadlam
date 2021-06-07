import React, { useState, useRef } from 'react';
import { Text, UIManager, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, FlatList, Image, ImageBackground } from 'react-native';
import { ScreenHOC, CustomButton, CustomDatePicker, CustomMCQModal, CustomModalPopup } from '../../../../../components';
import { COLORS, ICONS, _scaleText, TEXT_CONST, ROUTES } from '../../../../../shared';
import styles from './styles';
import { isTablet } from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
export const { width, height } = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    streamList,
    isPopupShown,
    updateStream,
    updateShowPopup
}) => {
    const [showModal, updateShowModal] = useState(!isPopupShown)

    const onModalClose = () => {
        updateShowModal(showModal => !showModal)
    }
    return (
        <ScreenHOC
            headerTitle={'Daily MCQ'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, borderWidth: 10 }}
        >



            {<CustomModalPopup updateStream={updateStream} updateShowPopup={updateShowPopup} onClose={onModalClose} visible={showModal && !isPopupShown} data={streamList} />}
            <ScrollView style={styles.dailyMcqContainer}>

                <FastImage
                    style={styles.mcqImage}
                    resizeMode={'stretch'}
                    source={require('../../../../../assets/images/quiz.jpg')}
                />

                <CustomButton onPress={() => navigation.navigate(ROUTES.DAILY_MCQ.QUIZ_SCREEN)} label={TEXT_CONST.START_DAILY_QUIZ} labelSize={isTablet() ? _scaleText(10).fontSize : _scaleText(14).fontSize} labelStyle={styles.mcqLabel} container={styles.mcqButton}></CustomButton>

            </ScrollView>
        </ScreenHOC >
    );
}

export default FriendsScreen;
