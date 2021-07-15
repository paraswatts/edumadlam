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
    signinRequest,
    handleSubmit,
    forgetPasswordRequest,
    resetForm
}) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const _onSignin = (formProps) => {
        let email = formProps.email.toLowerCase().trim()
        Keyboard.dismiss();
        console.log('herere', loggedIn)
        setEmail(email)
        signinRequest({
            netConnected,
            payload: { email: email, password: formProps.password, imei: DeviceInfo.getUniqueId() },
            success: (id) => {
                console.log("heferrer")
                setLoggedIn(true)

                resetForm();
            },
            fail: (message) => _showCustomToast({ message, type: 'error' })
        })
    }

    useEffect(() => {
        console.log("loggedIn", loggedIn)
        if (loggedIn) {
            console.log("herer")
            forgetPasswordRequest({
                netConnected,
                payload: { email: email, type: 'login' },
                success: () => {
                    console.log("gpo to verification ")
                    resetForm();
                    navigation.navigate(ROUTES.VERIFICATION_CODE_SCREEN, { email: email, login: true })
                    _showCustomToast({ message: TEXT_CONST.OTP_SENT, type: 'success' })
                },
                fail: (message) => _showCustomToast({ message, type: 'error' })
            })
        }
    }, [loggedIn])
    console.log("loggedIn")
    useEffect(() => {
        return () => {
            setLoggedIn(false)
        }
    })

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
                                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FORGET_PASSWORD)} style={{ marginTop: _scaleText(8).fontSize, alignSelf: 'flex-end' }}>
                                    <Text style={{
                                        color: 'blue', textDecorationLine: 'underline',
                                    }}> {TEXT_CONST.FORGET_PASSWORD}</Text>
                                </TouchableOpacity>
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