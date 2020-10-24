import React, { useState } from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { _scaleText, COLORS, TEXT_CONST, _openImagePicker, _openCamera, ICONS } from '../../../shared';
import { CustomTouchableIcon, CustomImage } from '../../atoms';

const ProfilePicView = ({
    camSize = 40,
    container,
    imageSize = 102,
    isEditable = true,
    isOnline,
    onChange = () => { },
    uri,
    viewable,
}) => {
    const [showModal, toggleModal] = useState(false);

    const OPTIONS = [
        {
            label: TEXT_CONST.UPLOAD_FROM_PHONE,
            onPress: () => _openImagePicker({}).then(({ path }) => {
                onChange(path);
                toggleModal(false);
            }).catch((error) => {
                console.log(error);
            })
        },
        {
            label: TEXT_CONST.TAKE_PHOTO,
            onPress: () => _openCamera({}).then(({ path }) => {
                onChange(path);
                toggleModal(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    ]

    return (
        <View style={[styles.container, container]}>
            <View>
                <CustomImage
                    size={imageSize}
                    viewable={viewable}
                    uri={uri}
                />
                {isEditable &&
                    <CustomTouchableIcon
                        onPress={() => toggleModal(true)}
                        style={styles.camera}
                    >
                        {ICONS.CAMERA(camSize)}
                    </CustomTouchableIcon>}
                {!!isOnline && <View
                    style={styles.online}
                />}

            </View>
            <Modal
                animated
                animationType='slide'
                onRequestClose={() => toggleModal(false)}
                statusBarTranslucent
                supportedOrientations={['landscape', 'portrait']}
                transparent
                visible={showModal}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => toggleModal(false)}
                    style={styles.modalContainer}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        style={styles.modalBottomView}
                    >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{TEXT_CONST.UPLOAD_PROFILE_PICTURE}</Text>
                            <CustomTouchableIcon
                                onPress={() => toggleModal(false)}>
                                {ICONS.CLOSE(24)}
                            </CustomTouchableIcon>
                        </View>
                        {OPTIONS.map(item => {
                            let { label, onPress = () => { } } = item;
                            return (<TouchableOpacity
                                activeOpacity={0.6}
                                key={label}
                                onPress={onPress}
                                style={styles.itemContainer}
                            >
                                <Text style={styles.itemLabel}>{label}</Text>
                            </TouchableOpacity>)
                        })}
                    </TouchableOpacity>
                    <SafeAreaView style={{ backgroundColor: 'white', }} />
                </TouchableOpacity>

            </Modal>
        </View>
    );
}

export default ProfilePicView;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: _scaleText(16).fontSize
    },
    online: {
        height: _scaleText(16).fontSize,
        width: _scaleText(16).fontSize,
        position: 'absolute',
        borderRadius: _scaleText(16).fontSize,
        right: 0,
        bottom: _scaleText(3).fontSize,
        borderWidth: _scaleText(2).fontSize,
        borderColor: 'white',
        backgroundColor: COLORS.SECONDARY.GREEN,
    },
    image: imageSize => ({
        width: _scaleText(imageSize).fontSize,
        height: _scaleText(imageSize).fontSize,
        borderRadius: _scaleText(imageSize).fontSize
    }),
    itemContainer: {
        marginTop: _scaleText(16).fontSize
    },
    itemLabel: {
        color: COLORS.GREY._1,

        fontSize: _scaleText(16).fontSize
    },
    camera: {
        position: 'absolute',
        bottom: 0,
        right: -_scaleText(5).fontSize,
    },
    modalContainer: {
        backgroundColor: 'rgba(21,48,89,0.7)',
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalBottomView: {
        paddingBottom: _scaleText(24).fontSize,
        paddingLeft: _scaleText(24).fontSize,
        paddingRight: _scaleText(24).fontSize,
        borderTopLeftRadius: _scaleText(15).fontSize,
        borderTopRightRadius: _scaleText(15).fontSize,
        backgroundColor: 'white',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        paddingVertical: _scaleText(16).fontSize
    },
    title: {
        color: COLORS.PRIMARY.PINK,

        fontSize: _scaleText(18).fontSize
    }
});