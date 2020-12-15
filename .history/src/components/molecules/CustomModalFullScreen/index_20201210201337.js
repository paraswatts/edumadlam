import React from 'react';
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
    children
}) => {
    console.log("children", children)
    return (
        <ScreenHOC
            bottomSafeArea
            headerTitle={'Test Questions'}
            showHeader
            showBackIcon
        // onBackPress={exitTest}
        >
            {/* <Modal
                animated
                animationType='slide'
                onRequestClose={onClose}
                // statusBarTranslucent
                // transparent
                visible={visible}
            > */}

            <View style={{ borderWidth: 4, borderColor: 'red', flex: 1 }}>

            </View>
            {/* </Modal > */}
        </ScreenHOC>
    );
}

export default CustomModal;
