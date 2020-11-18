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
                    <CustomTouchableIcon style={styles.close} onPress={onClose}>
                        {ICONS.CLOSE(24)}
                    </CustomTouchableIcon>
                    {icon}
                    {!!title && <Text style={styles.title}>{title}</Text>}
                    {!!display_name && <View style={styles.userCont}>
                        <CustomImage
                            uri={BASE_URL + '/pp/' + photo_id}
                        />
                        <View style={styles.nameCont}>
                            <Text style={styles.name}>{display_name}</Text>
                            <Text style={styles.verify}>{no_of_times_address_verified} {TEXT_CONST.VERIFIED}</Text>
                        </View>
                    </View>}
                    {!!subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                    {!!subTitle2 && <Text style={styles.subTitle}>{subTitle2}</Text>}
                    {!!display_name && <View style={{ flexDirection: 'row', marginVertical: _scaleText(16).fontSize }}>
                        {ICONS.LOCATION(22)}
                        <Text style={styles.address}>{address}, {city}, {state} {zip}</Text>
                    </View>}
                    {!!display_name && <View style={{ flexDirection: 'row', }}>
                        <CustomButton
                            container={[styles.button, { backgroundColor: 'white', flex: 1, marginRight: _scaleText(16).fontSize }]}
                            label={'I don’t know'}
                            labelStyle={[styles.buttonLabel, { color: COLORS.PRIMARY.PINK, }]}
                            onPress={onButtonPress2}
                        />
                        <CustomButton
                            container={[styles.button, { flex: 1, }]}
                            label={'Confirm'}
                            labelStyle={styles.buttonLabel}
                            onPress={onButtonPress}
                        />
                    </View>}
                    <CustomButton
                        container={styles.button}
                        label={buttonLabel}
                        labelStyle={styles.buttonLabel}
                        onPress={onButtonPress}
                    />}
                </TouchableOpacity>
            </TouchableOpacity>

        </Modal >
    );
}

export default CustomModal;
