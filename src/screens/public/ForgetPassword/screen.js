import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomFloatButton, CustomTouchableIcon } from '../../../components';
import { TEXT_CONST, _scaleText, _formatPhoneNumber, _checkValidPhoneNumber, _checkValidEmail, ROUTES, _showCustomToast, ICONS, LINKS } from '../../../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { CustomButton } from '../../../components/atoms';
import { COLORS, validator } from '../../../shared';
import { Field, reduxForm } from 'redux-form';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SigninScreen = ({
    navigation,
    requestOTP,
    netConnected,
    forgetPasswordRequest,
    handleSubmit,
    resetForm
}) => {
    const _onSignin = (formProps) => {
        console.log("forgetPasswordRequest", formProps)
        let email = formProps.email.toLowerCase().trim()
        Keyboard.dismiss();
        forgetPasswordRequest({
            netConnected,
            payload: { email: email, type: 'forget' },
            success: () => {
                resetForm();
                navigation.navigate(ROUTES.VERIFICATION_CODE_SCREEN, { email: email, login: false })
                _showCustomToast({ message: TEXT_CONST.OTP_SENT, type: 'success' })
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
                                <Text style={styles.signup}>{TEXT_CONST.FORGET_PASSWORD}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNIN_SCREEN)}>
                                    <Text>{TEXT_CONST.SKIP}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.fillCredentials}>{TEXT_CONST.FILL_CREDENTIALS}</Text>
                            <View style={styles.form}>
                                <Field
                                    name={TEXT_CONST.EMAIL_INPUT_NAME}
                                    props={{
                                        placeholder: 'Email Address'
                                    }}
                                    component={CustomTextInput}
                                />


                                <CustomButton
                                    label={TEXT_CONST.FORGET_PASSWORD}
                                    labelStyle={{ color: 'white' }}
                                    onPress={handleSubmit(_onSignin)}
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
    form: 'forgetPassword',
    fields: ['email'],
    validate: validator,
    enableReinitialize: true,
})(SigninScreen);
export default reduxFormFunction