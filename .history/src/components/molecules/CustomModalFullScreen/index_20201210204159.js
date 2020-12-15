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
    answersListObj
}) => {
    useEffect(() => {
        answersListObj
    }, [
        answersListObj
    ])
    console.log("answersListObj", answersListObj)
    const mergeArraysAnswers = (arr1, arr2) => {
        for (let x in arr1) {
            let obj = arr1[x]
            var filteredElements = arr2.filter(function (item, index) { return item.qId == obj._id; });
            if (!filteredElements.length) {
                arr2.push({ qId: obj._id, answer: false, _quest: obj._quest })
            }
            // console.log(arr2)
        }
        return arr2
    }
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
