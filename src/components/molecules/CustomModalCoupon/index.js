import React, { useEffect, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC, CustomFloatButton } from '../..';
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
    updateStream,
    data,
    updateShowPopup
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

            <View
                activeOpacity={1}
                onPress={() => { }}
                style={styles.dataContainer}
            >
                <View style={{ borderWidth: 0, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: _scaleText(18).fontSize, fontWeight: '500' }}>{TEXT_CONST.SELECT_STREAM}</Text>
                    <CustomTouchableIcon style={styles.close} onPress={onClose}>
                        {ICONS.CLOSE(24)}
                    </CustomTouchableIcon>
                </View>


            </View>

        </Modal >
    );
}

export default CustomModal;
