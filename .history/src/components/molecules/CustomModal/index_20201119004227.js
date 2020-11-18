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
    showExit
}) => {

    return (
        <Modal
            animated
            animationType='slide'
            onRequestClose={onClose}
            statusBarTranslucent
            transparent
            visible={visible}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={styles.container}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { }}
                    style={styles.dataContainer}
                >
                    {!!showExit &&
                        <CustomTouchableIcon style={styles.close} onPress={onClose}>
                            {ICONS.CLOSE(24)}
                        </CustomTouchableIcon>}

                    <CustomButton
                        container={styles.button}
                        label={buttonLabel}
                        labelStyle={styles.buttonLabel}
                        onPress={onButtonPress}
                    />
                </TouchableOpacity>
            </TouchableOpacity>

        </Modal >
    );
}

export default CustomModal;
