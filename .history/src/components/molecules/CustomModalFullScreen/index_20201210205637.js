import React, { useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC } from '../../../components';
import { ICONS, ILLUSTRATIONS, _scaleText, COLORS, BASE_URL, TEXT_CONST } from '../../../shared';
import styles from './styles';

const CustomModal = ({
    buttonLabel,
    icon = ILLUSTRATIONS.FRIEND_MOVED(150, 120),
    onButtonPress = () => { },
    onButtonPress2 = () => { },
    onClose = () => { },
    visible,
    showExit,
    children,
    _toggleFilterModal,
    answersListObj,
    data
}) => {
    useEffect(() => {
        // console.log("mergeArraysAnswers", mergeArraysAnswers(data, answersListObj))
    }, [answersListObj])
    console.log("answersListObj", answersListObj)

    return (
        <Modal
            animated
            animationType='slide'
            onRequestClose={onClose}
            // statusBarTranslucent
            // transparent
            visible={visible}

        >
            <ScreenHOC
                bottomSafeArea
                headerTitle={'Filters'}
                showHeader
                showBackIcon
                backIcon={ICONS.CLOSE_WHITE(30)}
                onBackPress={_toggleFilterModal}
            >


                <View style={{ borderWidth: 4, borderColor: 'red', flex: 1 }}>

                </View>

            </ScreenHOC>
        </Modal >
    );
}

export default CustomModal;
