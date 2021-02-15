import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { isTablet } from 'react-native-device-info';
import Splash from 'react-native-splash-screen';
import { ROUTES, updateAuthToken } from '../../../shared';

const SplashScreen = ({
    navigation,
    netConnected,
    getUserONBStepsRequest,
    authToken,
}) => {
    useEffect(() => {
        // authToken = Platform.OS == 'android' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODIzMDQ3NjAiLCJpYXQiOjE2MDAxMzU1NTN9.8pXwTr5PbqcwtxfHP7Fm6EwKt6lU48y059rVPEhtSKU' : isTablet() ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODQyODM5ODUiLCJpYXQiOjE2MDE4MTQ1NDl9.2j7xgJZXfmaZH__WzidGOeAs2hLPHdm_atDONvWZphM' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxMjczMTk4NjMiLCJpYXQiOjE2MDA4NTU1NzB9.kb0VZlUUPEpG2g8ADyRNwWFVi5tccT4GJQmrP9DK8io'
        authToken && updateAuthToken(authToken)
        // navigation.replace(ROUTES.BOTTOM_TAB_DASHBOARD)
        // Splash.hide()
        if (authToken) {
            Splash.hide()
            navigation.replace(ROUTES.HOME)
        }
        else {
            (navigation.replace(ROUTES.SIGNIN_SCREEN),
                setTimeout(() => {
                    Splash.hide();
                }, 500))
        }
    }, [])

    return null
}

export default SplashScreen;
