import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomFloatButton, CustomTouchableIcon } from '../../../components';
import { TEXT_CONST, _scaleText, _formatPhoneNumber, _checkValidPhoneNumber, _checkValidEmail, ROUTES, _showCustomToast, ICONS, LINKS } from '../../../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { CustomButton } from '../../../components/atoms';
import { COLORS, validator } from '../../../shared';
import { Field, reduxForm } from 'redux-form';
import DeviceInfo from 'react-native-device-info';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SigninScreen = ({
    navigation,
    requestOTP,
    netConnected,
    updateUserRequest,
    route: { name, params: { email, sId } = {} },
    handleSubmit,
    resetForm
}) => {
    const _updatePassword = (formProps) => {
        Keyboard.dismiss();
        updateUserRequest({
            netConnected,
            payload: { sId: sId, password: formProps.password },
            success: (id) => {
                resetForm();
                navigation.navigate(ROUTES.SIGNIN_SCREEN)
                _showCustomToast({ message: TEXT_CONST.LOGIN_SUCCESS, type: 'success' })
            },
            fail: (message) => _showCustomToast({ message, type: 'error' })
        })

    }
    let { bottom } = useSafeAreaInsets();
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''}>
            <ScreenHOC bottomSafeArea containerStyle={styles.container} >
                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={{ minHeight: Dimensions.get('window').height - _scaleText(230).fontSize - bottom }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.signup}>{TEXT_CONST.CHANGE_PASSWORD}</Text>
                            </View>
                            <View style={styles.form}>
                                <Field
                                    name={TEXT_CONST.PASSWORD_INPUT_NAME}
                                    props={{
                                        placeholder: 'Password'
                                    }}
                                    secureTextEntry
                                    component={CustomTextInput}
                                />
                                <Field
                                    name={TEXT_CONST.CONFIRM_PASSWORD_INPUT_NAME}
                                    props={{
                                        placeholder: 'Confirm Password'
                                    }}
                                    secureTextEntry
                                    component={CustomTextInput}
                                />

                                <CustomButton
                                    label={TEXT_CONST.UPDATE}
                                    labelStyle={{ color: 'white' }}
                                    onPress={handleSubmit(_updatePassword)}
                                    container={styles.buttonStyle}
                                />
                            </View>
                        </View>

                    </ScrollView>


                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}
const reduxFormFunction = reduxForm({
    form: 'changePassword',
    fields: ['confirm_password', 'password'],
    validate: validator,
    enableReinitialize: false,
})(SigninScreen);
export default reduxFormFunction