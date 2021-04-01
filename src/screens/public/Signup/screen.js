import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomFloatButton, CustomTouchableIcon } from '../../../components';
import { TEXT_CONST, _scaleText, _formatPhoneNumber, _checkValidPhoneNumber, _checkValidEmail, ROUTES, _showCustomToast, ICONS, LINKS } from '../../../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { CustomButton } from '../../../components/atoms';
import { COLORS, validator } from '../../../shared';
import { Field, reduxForm } from 'redux-form';
import DeviceInfo from 'react-native-device-info';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SignUpScreen = ({
    navigation,
    netConnected,
    signupRequest,
    handleSubmit,
    resetForm
}) => {
    const _onSignUp = (formProps) => {
        Keyboard.dismiss();
        signupRequest({
            netConnected,
            payload: { name: formProps.name, email: formProps.email.toLowerCase().trim(), password: formProps.password, mobile: formProps.mobile, imei: DeviceInfo.getDeviceId() },
            success: () => {
                resetForm();
                navigation.navigate(ROUTES.HOME)
                _showCustomToast({ message: TEXT_CONST.REGISTRATION_SUCESS, type: 'success' })
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
                                <Text style={styles.signup}>{TEXT_CONST.SIGNUP}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HOME)}>
                                    <Text>{TEXT_CONST.SKIP}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.fillCredentials}>{TEXT_CONST.FILL_CREDENTIALS}</Text>
                            <View style={styles.form}>
                                <Field
                                    name={TEXT_CONST.NAME_INPUT_NAME}
                                    props={{
                                        placeholder: 'Name'
                                    }}
                                    component={CustomTextInput}
                                />
                                <Field
                                    name={TEXT_CONST.EMAIL_INPUT_NAME}
                                    props={{
                                        placeholder: 'Email Address'
                                    }}
                                    keyboardType='email-address'
                                    component={CustomTextInput}
                                />
                                <Field
                                    name={TEXT_CONST.MOBILE_INPUT_NAME}
                                    props={{
                                        placeholder: 'Mobile Number'
                                    }}
                                    keyboardType='phone-pad'
                                    component={CustomTextInput}
                                />
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
                                    label={TEXT_CONST.SIGN_UP}
                                    labelStyle={{ color: 'white' }}
                                    onPress={handleSubmit(_onSignUp)}
                                    container={styles.buttonStyle}
                                />
                            </View>
                        </View>
                        <Text style={styles.privacyPolicy}>
                            {TEXT_CONST.PRIVACY_POLICY_TEXT}
                            <Text onPress={() => navigation.navigate(ROUTES.WEB_VIEW_SCREEN, { uri: LINKS.PRIVACY_POLICY, title: TEXT_CONST.PRIVACY_POLICY })} style={styles.termsHyperlink}>{TEXT_CONST.PRIVACY_POLICY}</Text>
                            {TEXT_CONST.AND_AGREE}
                            <Text onPress={() => navigation.navigate(ROUTES.WEB_VIEW_SCREEN, { uri: LINKS.TERMS_OF_SERVICE, title: TEXT_CONST.TERMS_OF_SERVICE })} style={styles.termsHyperlink}>{TEXT_CONST.TERMS_OF_SERVICE}</Text>.
                            </Text>

                        <Text style={styles.alreadyMember}>
                            {TEXT_CONST.ALREADY_A_MEMBER}
                            <Text onPress={() => navigation.navigate(ROUTES.SIGNIN_SCREEN)} style={styles.termsHyperlink}>{TEXT_CONST.SIGN_IN}</Text>
                        </Text>
                    </ScrollView>


                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}
const reduxFormFunction = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'mobile', 'name', 'confirm_password'],
    validate: validator,
    enableReinitialize: false,
})(SignUpScreen);
export default reduxFormFunction



