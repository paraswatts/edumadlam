import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage } from '../../atoms';
import { ICONS, ILLUSTRATIONS, _scaleText, COLORS, BASE_URL, TEXT_CONST } from '../../../shared';
import styles from './styles';

const CustomModal = ({
    buttonLabel,
    icon = ILLUSTRATIONS.FRIEND_MOVED(150, 120),
    onButtonPress = () => { },
    onButtonPress2 = () => { },
    onClose = () => { },
    selectedUser: { photo_id = '', address = '', city = '', state = '', zip = '', display_name = '', no_of_times_address_verified = 0 } = {},
    subTitle,
    subTitle2,
    title = '',
    visible,
}) => {

    return (
        <Modal
            animated
            animationType='slide'
            onRequestClose={onClose}
            statusBarTranslucent
            transparent
            visible={visible}
            style={{ borderWidth: 2 }}
        >


        </Modal >
    );
}

export default CustomModal;
