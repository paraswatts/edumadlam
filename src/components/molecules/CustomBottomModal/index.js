import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { COLORS, ICONS, TEXT_CONST, TEXT_STYLES, _scaleText } from '../../../shared';
import { CustomButton, CustomTouchableIcon } from '../../atoms';

const CustomBottomModal = ({
    onClose = () => { },
    view,
    title,
    titleView,
    buttonTitle,
    visible,
    hideClose,
    disableTouch,
    button2Label = '',
    onPress = () => { },
    onPress2 = () => { },
    validator = () => { },
    validator2 = () => { },
}) => {

    const validateData = () => {
        return validator()
    }

    const verifyAction = () => {
        updateInvalidStatus(true)
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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior='padding'
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onClose}
                    disabled={disableTouch}
                    style={styles.container}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { }}
                        disabled={disableTouch}
                        style={styles.dataContainer}
                    >
                        {titleView ?
                            <View style={styles.titleContainerWithView}>
                                {titleView}
                                {!hideClose && <CustomTouchableIcon onPress={onClose}>
                                    {ICONS.CLOSE(24)}
                                </CustomTouchableIcon>}
                            </View>
                            :
                            <View style={styles.titleContainer}>
                                {title && <Text style={styles.title}>{title}</Text>}
                                {!hideClose && <CustomTouchableIcon onPress={onClose}>
                                    {ICONS.CLOSE(24)}
                                </CustomTouchableIcon>}
                            </View>
                        }
                    </TouchableOpacity >
                    <TouchableOpacity
                        activeOpacity={1}
                        disabled={disableTouch}
                        onPress={() => { }}
                    >
                        {view}
                        <View style={{ flexDirection: 'row' }}>
                            {!!button2Label && <CustomButton
                                container={styles.button2(validator2())}
                                disabled={validator2()}
                                label={button2Label}
                                labelStyle={styles.button2Label(validator2())}
                                onPress={() => onPress2()}
                            />}
                            <CustomButton
                                container={styles.button(validateData())}
                                disabled={validateData()}
                                label={buttonTitle}
                                labelStyle={styles.buttonLabel}
                                onPress={() => onPress()}
                            />
                        </View>
                    </TouchableOpacity>
                    <SafeAreaView style={{ backgroundColor: 'white', }} />
                </TouchableOpacity >
            </KeyboardAvoidingView>
        </Modal >
    );

}

export default CustomBottomModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(21,48,89,0.7)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    dataContainer: {
        paddingHorizontal: _scaleText(24).fontSize,
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
    titleContainerWithView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: _scaleText(16).fontSize
    },
    title: {
        color: COLORS.PRIMARY.PINK,
        flex: 1,

        fontSize: _scaleText(18).fontSize
    },
    button: (disabled) => ({
        backgroundColor: disabled ? COLORS.GREY._4 : COLORS.PRIMARY.PINK,
        borderRadius: 0,
        borderWidth: 0,
        flex: 1,
        paddingVertical: _scaleText(14).fontSize
    }),
    button2: (disabled) => ({
        backgroundColor: 'white',
        borderColor: disabled ? COLORS.GREY._4 : COLORS.PRIMARY.PINK,
        borderRadius: 0,
        borderWidth: 0,
        borderTopWidth: _scaleText(1).fontSize,
        borderRightWidth: _scaleText(1).fontSize,
        flex: 1,
        paddingVertical: _scaleText(14).fontSize
    }),
    buttonLabel: {
        color: 'white',

    },
    button2Label: (disabled) => ({
        color: disabled ? COLORS.GREY._4 : COLORS.PRIMARY.PINK,

    }),
})