import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Dimensions, Platform, Keyboard, LayoutAnimation, UIManager } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomFloatButton, CustomTouchableIcon } from '../../../components';
import { TEXT_CONST, _scaleText, _formatPhoneNumber, _checkValidPhoneNumber, _checkValidEmail, ROUTES, _showCustomToast, ICONS, LINKS } from '../../../shared';
import styles from './styles';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SignupScreen = ({
    navigation,
    signupRequest,
    netConnected,
}) => {
    const [activeField, updateActiveField] = useState('');
    const [email, updateEmail] = useState('');
    const [emailAlreadyRegistered, updateEmailRegistered] = useState(false);
    const [invalid, updateInvalid] = useState({});
    const [phone, updatePhone] = useState('');
    const [keyboardVisible, toggleKeyboardStaus] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => { toggleKeyboardStaus(true) });
        Keyboard.addListener("keyboardDidHide", () => { toggleKeyboardStaus(false) });
        return () => {
            Keyboard.removeListener("keyboardDidShow", () => { });
            Keyboard.removeListener("keyboardDidHide", () => { });
        };
    }, []);



    const renderEmailAlreadyRegistered = () => {
        let num = phone.replace(/[^A-Z0-9]/ig, "");
        num = num.slice(num.length - 10)
        return (<View style={styles.emailAlreadyRegisteredContainer}>
            <Text style={styles.emailRegisteredText}>{TEXT_CONST.EMAIL_ALREADY_REGISTERED}</Text>
            <Text onPress={() => navigation.navigate(ROUTES.VERIFICATION_CODE_SCREEN, { update: true, phone: _formatPhoneNumber(num), email })} style={styles.update}>{TEXT_CONST.UPDATE}</Text>
        </View>)
    }

    const _onSignup = () => {
        let num = phone.replace(/[^A-Z0-9]/ig, "");
        num = num.slice(num.length - 10)
        Keyboard.dismiss();
        signupRequest({
            netConnected,
            payload: { email, phone: num },
            alreadyRegistered: () => { LayoutAnimation.easeInEaseOut(); updateEmailRegistered(true) },
            success: () => navigation.navigate(ROUTES.VERIFICATION_CODE_SCREEN, { phone: _formatPhoneNumber(num) }),
            fail: (message) => _showCustomToast({ message, type: 'error' })
        })
    }

    const _checkEmail = (email) => { updateInvalid({ ...invalid, email: !_checkValidEmail(email) }) }
    const _checknumber = (phone) => { updateInvalid({ ...invalid, phone: !_checkValidPhoneNumber(phone) }) }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''}>
            <ScreenHOC bottomSafeArea containerStyle={styles.container} >
                <View style={{ flex: 1 }}>
                    {fromSignin && <CustomTouchableIcon style={styles.back} onPress={navigation.goBack}>
                        {ICONS.BACK(24)}
                    </CustomTouchableIcon>}
                    <ScrollView style={styles.scrollContainer}>
                        <View style={{ minHeight: Dimensions.get('window').height * (fromSignin ? 0.6 : 0.65) }}>
                            <Text style={styles.signup}>{TEXT_CONST.SIGN_UP}</Text>
                            <Text style={styles.fillCredentials}>{TEXT_CONST.FILL_CREDENTIALS}</Text>
                            <CustomTextInput
                                active={activeField == 'phone'}
                                containerStyle={styles.mobInput}
                                error={invalid.phone}
                                errorMessage={TEXT_CONST.INVALID_PHONE}
                                keyboardType='phone-pad'
                                maxLength={phone.length ? phone.slice(0, 2) == '+1' ? 15 : phone[0] == '1' ? 16 : 14 : 14}
                                onBlur={() => { _checknumber(phone); toggleKeyboardStaus(false); updateActiveField('') }}
                                onChangeText={phone => { updateEmailRegistered(false); _checknumber(_formatPhoneNumber(phone)); updatePhone(_formatPhoneNumber(phone)) }}
                                onFocus={() => { toggleKeyboardStaus(true); updateActiveField('phone') }}
                                placeholder={TEXT_CONST.MOB_NUMBER}
                                returnKeyType='next'
                                value={phone}
                            />
                            <CustomTextInput
                                active={activeField == 'email'}
                                autoCapitalize='none'
                                customBottom={emailAlreadyRegistered && renderEmailAlreadyRegistered()}
                                error={invalid.email}
                                errorMessage={TEXT_CONST.INVALID_EMAIL}
                                keyboardType='email-address'
                                maxLength={64}
                                onBlur={() => { _checkEmail(email); toggleKeyboardStaus(false); updateActiveField('') }}
                                onChangeText={email => { _checkEmail(email); updateEmailRegistered(false); updateEmail(email) }}
                                onFocus={() => { toggleKeyboardStaus(true); updateActiveField('email') }}
                                placeholder={TEXT_CONST.EMAIL_ADDRESS}
                                subText={!emailAlreadyRegistered && TEXT_CONST.VERIFICATION_TEXT}
                                value={email}
                            />

                        </View>
                        {!keyboardVisible && <CustomFloatButton
                            absolue={false}
                            disabled={!(_checkValidPhoneNumber(phone) && !emailAlreadyRegistered && _checkValidEmail(email))}
                            onPress={_onSignup}
                        />}
                        <Text style={styles.privacyPolicy}>
                            {TEXT_CONST.PRIVACY_POLICY_TEXT}
                            <Text onPress={() => navigation.navigate(ROUTES.WEB_VIEW_SCREEN, { uri: LINKS.PRIVACY_POLICY, title: TEXT_CONST.PRIVACY_POLICY })} style={styles.termsHyperlink}>{TEXT_CONST.PRIVACY_POLICY}</Text>
                            {TEXT_CONST.AND_AGREE}
                            <Text onPress={() => navigation.navigate(ROUTES.WEB_VIEW_SCREEN, { uri: LINKS.TERMS_OF_SERVICE, title: TEXT_CONST.TERMS_OF_SERVICE })} style={styles.termsHyperlink}>{TEXT_CONST.TERMS_OF_SERVICE}</Text>.
                        </Text>

                        <Text style={styles.alreadyMember}>
                            {TEXT_CONST.ALREADY_A_MEMBER}
                            <Text onPress={() => navigation.navigate(ROUTES.SIGNIN_SCREEN, { fromSignup: !fromSignin })} style={styles.termsHyperlink}>{TEXT_CONST.SIGN_IN}</Text>
                        </Text>
                    </ScrollView>

                    {keyboardVisible && <CustomFloatButton
                        disabled={!(_checkValidPhoneNumber(phone) && !emailAlreadyRegistered && _checkValidEmail(email))}
                        onPress={_onSignup}
                    />}
                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}

export default SignupScreen;
