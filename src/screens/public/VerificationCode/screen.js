import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { ScreenHOC, CustomButton, CustomOtpBox, CustomTouchableIcon } from '../../../components';
import styles from './styles';
import { TEXT_CONST, _scaleText, ROUTES, _showCustomToast, replace, ICONS, } from '../../../shared';

const VerificationScreen = ({
    navigation,
    netConnected,
    phoneUpdateOtpRequest,
    phoneUpdateRequest,
    route: { name, params: { email } = {} },
    otpVerifyRequest,
    requestOTP,
    signinRequest,
}) => {
    const [phoneOTP, updatePhoneOTP] = useState(new Array(6));
    const [invalidCode, updateInvalidStatus] = useState({});

    const _verifyOtp = () => {
        Keyboard.dismiss();
        otpVerifyRequest({
            netConnected,
            payload: { email: email, otp: phoneOTP.join('') },
            success: (sId) => {
                navigation.navigate(ROUTES.CHANGE_PASSWORD, { email: email, sId: sId })
                _showCustomToast({ message: TEXT_CONST.VERIFIED, type: 'success' })
            },
            fail: (message) => _showCustomToast({ message, type: 'error' })
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
                        <Text style={styles.title}>{TEXT_CONST.VERIFICATION_CODE}</Text>
                        <View style={styles.subtitleContainer()}>
                            <Text style={styles.subtitle}>{`${TEXT_CONST.VERIFICATION_CODE_SUBTITLE}`}</Text>
                        </View>

                        <CustomOtpBox
                            n={4}
                            error={invalidCode.phone}
                            value={phoneOTP}
                            onChangeText={otp => { updateInvalidStatus({ ...invalidCode, phone: false }); updatePhoneOTP(otp) }}
                        />

                        {/* <Text style={invalidCode.phone ? styles.invalidCode : styles.codeNotReceived}>{invalidCode.phone ? TEXT_CONST.INVALID_CODE : TEXT_CONST.CODE_NOT_RECEIVED}</Text>
                        <Text onPress={onResendCode} style={styles.resendCode}>{TEXT_CONST.RESEND_CODE}</Text> */}
                        <CustomButton
                            label={TEXT_CONST.VERIFY}
                            labelStyle={{ color: 'white' }}
                            onPress={_verifyOtp}
                            container={styles.buttonStyle}
                        />
                    </ScrollView>

                </View>
            </ScreenHOC>
        </KeyboardAvoidingView>
    );
}

export default VerificationScreen;
