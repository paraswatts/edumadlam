import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { ScreenHOC, CustomFloatButton, CustomOtpBox, CustomTouchableIcon } from '../../../components';
import styles from './styles';
import { TEXT_CONST, _scaleText, ROUTES, _showCustomToast, replace, ICONS, } from '../../../shared';

const VerificationScreen = ({
    navigation,
    netConnected,
    phoneUpdateOtpRequest,
    phoneUpdateRequest,
    requestOTP,
    signinRequest,
}) => {
    const [emailOTP, updateEmailOTP] = useState(new Array(6));
    const [phoneOTP, updatePhoneOTP] = useState(new Array(6));
    const [invalidCode, updateInvalidStatus] = useState({});

    const onResendCode = () => {
        updateEmailOTP(new Array(6));
        updatePhoneOTP(new Array(6));
        updateInvalidStatus({});
        update ? phoneUpdateOtpRequest({
            netConnected,
            payload: {
                email,
                phone: phone.replace(/[^A-Z0-9]/ig, ""),
            },
            success: () => _showCustomToast({ message: TEXT_CONST.CODE_RESEND, type: 'success' }),
            fail: (message) => _showCustomToast({ message, type: 'error' })
        }) :
            requestOTP({
                netConnected,
                payload: { phone_or_email: email ? email : phone.replace(/[^A-Z0-9]/ig, "") },
                success: () => _showCustomToast({ message: TEXT_CONST.CODE_RESEND, type: 'success' }),
                fail: (message) => _showCustomToast({ message, type: 'error' })
            })
    }

    const onNextPress = () => {
        Keyboard.dismiss();
        update ?
            phoneUpdateRequest({
                netConnected,
                payload: {
                    email_otp: emailOTP.join(''),
                    email,
                    phone_otp: phoneOTP.join(''),
                    phone: phone.replace(/[^A-Z0-9]/ig, ""),
                },
                success: () => {
                    navigation.popToTop();
                    replace(ROUTES.SIGNIN_SCREEN)
                    _showCustomToast({ message: TEXT_CONST.MOBILE_UPDATE_SUCESS, type: 'success' })
                },
                fail: (message) => _showCustomToast({ message, type: 'error' })
            }) :
            signinRequest({
                netConnected,
                payload: {
                    otp: phoneOTP.join(''),
                    phone_or_email: email ? email : phone.replace(/[^A-Z0-9]/ig, "")
                },
                success: () => {
                    !fromSignin && _showCustomToast({ message: TEXT_CONST.REGISTRATION_SUCESS, type: 'success' })
                },
                fail: (message) => {
                    message == 'Invalid OTP' ? updateInvalidStatus({ ...invalidCode, phone: true }) : _showCustomToast({ message, type: 'error' })
                }
            })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''}>
            <ScreenHOC bottomSafeArea containerStyle={styles.container} >
                <View style={{ flex: 1 }}>
                    <CustomTouchableIcon style={styles.back} onPress={navigation.goBack}>
                        {ICONS.BACK(24)}
                    </CustomTouchableIcon>
                    <ScrollView style={styles.scrollContainer}>
                        <Text style={styles.title}>{update ? TEXT_CONST.UPDATE_MOBILE_NUMBER : TEXT_CONST.VERIFICATION_CODE}</Text>
                        <View style={styles.subtitleContainer()}>
                            <Text style={styles.subtitle}>{`${TEXT_CONST.VERIFICATION_CODE_SUBTITLE}\n${phone}`}</Text>
                        </View>

                        <CustomOtpBox
                            n={6}
                            error={invalidCode.phone}
                            value={phoneOTP}
                            onChangeText={otp => { updateInvalidStatus({ ...invalidCode, phone: false }); updatePhoneOTP(otp) }}
                        />

                        <Text style={invalidCode.phone ? styles.invalidCode : styles.codeNotReceived}>{invalidCode.phone ? TEXT_CONST.INVALID_CODE : TEXT_CONST.CODE_NOT_RECEIVED}</Text>
                        <Text onPress={onResendCode} style={styles.resendCode}>{TEXT_CONST.RESEND_CODE}</Text>

                        {update && <View>
                            <View style={styles.subtitleContainer(24)}>
                                <Text style={styles.subtitle}>{`${TEXT_CONST.VERIFICATION_CODE_SUBTITLE}\n${email}`}</Text>
                            </View>

                            <CustomOtpBox
                                error={invalidCode.email}
                                n={6}
                                onChangeText={otp => updateEmailOTP(otp)}
                                value={emailOTP}
                            />

                            <Text style={invalidCode.email ? styles.invalidCode : styles.codeNotReceived}>{invalidCode.email ? TEXT_CONST.INVALID_CODE : TEXT_CONST.CODE_NOT_RECEIVED}</Text>
                            <Text onPress={onResendCode} style={styles.resendCode}>{TEXT_CONST.RESEND_CODE}</Text>
                        </View>}
                    </ScrollView>
                    <CustomFloatButton
                        disabled={!((phoneOTP.join('').length == 6) && (update ? emailOTP.join('').length == 6 : true))}
                        onPress={onNextPress}
                    />
                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}

export default VerificationScreen;
