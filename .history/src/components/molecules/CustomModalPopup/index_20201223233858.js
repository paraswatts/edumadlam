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
    updateStream,
    data,
    updateShowPopup
}) => {
    const quesRef = useRef();
    const renderStreamItem = ({ item, index }) => {
        const { _id, _name, } = item
        return (
            <TouchableOpacity onPress={() => {
                onClose()
                try {
                    updateShowPopup(true)
                    updateStream(_id)
                } catch (e) {
                    console.log("eeeee", e)
                }
            }} style={{ flexDirection: 'row', marginVertical: _scaleText(5).fontSize, marginHorizontal: _scaleText(10).fontSize, borderWidth: 0.5, padding: _scaleText(5).fontSize, borderRadius: _scaleText(5).fontSize }}>
                <Text>{_name}</Text>
            </TouchableOpacity>
        )
    }
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
                    <FlatList
                        ref={quesRef}
                        keyExtractor={(item, index) => item._id + '' + index}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        data={data}
                        extraData={data}
                        renderItem={(item) => renderStreamItem(item)}
                    />

                </View>
            </TouchableOpacity>

        </Modal >
    );
}

export default CustomModal;
