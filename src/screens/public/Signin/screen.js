import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomFloatButton, CustomTouchableIcon } from '../../../components';
import { TEXT_CONST, _scaleText, _formatPhoneNumber, _checkValidPhoneNumber, _checkValidEmail, ROUTES, _showCustomToast, ICONS, LINKS } from '../../../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { CustomButton } from '../../../components/atoms';
import { COLORS, validator } from '../../../shared';
import { Field, reduxForm } from 'redux-form';
import { TouchableOpacity } from 'react-native-gesture-handler';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SigninScreen = ({
    navigation,
    requestOTP,
    netConnected,
    signinRequest,
    handleSubmit,
    resetForm
}) => {
    const _onSignin = (formProps) => {
        Keyboard.dismiss();
        signinRequest({
            netConnected,
            payload: { email: formProps.email.toLowerCase().trim(), password: formProps.password },
            success: (id) => {
                resetForm();
                navigation.navigate(ROUTES.HOME, { userId: id })
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
                                <Text style={styles.signup}>{TEXT_CONST.SIGNIN}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HOME)}>
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
                                <Field
                                    name={TEXT_CONST.PASSWORD_INPUT_NAME}
                                    props={{
                                        placeholder: 'Password'
                                    }}
                                    secureTextEntry
                                    component={CustomTextInput}
                                />

                                <CustomButton
                                    label={TEXT_CONST.SIGN_IN}
                                    labelStyle={{ color: 'white' }}
                                    onPress={handleSubmit(_onSignin)}
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
                            {TEXT_CONST.DONT_HAVE_ACCOUNT}
                            <Text onPress={() => navigation.navigate(ROUTES.SIGNUP_SCREEN, { fromSignin: true })} style={styles.termsHyperlink}>{TEXT_CONST.SIGNUP}</Text>
                        </Text>
                    </ScrollView>


                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}
const reduxFormFunction = reduxForm({
    form: 'login',
    fields: ['email', 'password'],
    validate: validator,
    enableReinitialize: false,
})(SigninScreen);
export default reduxFormFunction