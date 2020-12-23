import React, { useEffect, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC, CustomFloatButton } from '../../../components';
import { ICONS, ILLUSTRATIONS, _scaleText, COLORS, BASE_URL, TEXT_CONST } from '../../../shared';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HTMLView from 'react-native-htmlview';

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
    data,
    goToQuestion
}) => {
    const quesRef = useRef();

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
            // style={styles.container}
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
                    {children}
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
