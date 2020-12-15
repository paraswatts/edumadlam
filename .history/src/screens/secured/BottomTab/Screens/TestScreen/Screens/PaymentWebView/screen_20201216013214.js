import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { ScreenHOC } from '../../../../../../../components';
import { COLORS } from '../../../../../../../shared';

const PaymentScreen = ({
    navigation,
    route: { params: { _webPage } = {} }
}) => {
    const [loading, toggleLoading] = useState(false);
    return (
        <ScreenHOC
            showHeader
            showBackIcon
            headerTitle={'Payment'}
            onBackPress={navigation.goBack}
        >{
                console.log("uriuriuri", _webpage)
            }
            <WebView
                source={{ uri: _webpage }}
                startInLoadingState
                // onNavigationStateChange={(webViewState) => {
                //     console.log(webViewState.url)
                //     if (webViewState.url === "http://payment.sucess") {
                //         //navigate or close webview
                //     }
                // }
                // }
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </ScreenHOC>
    );
}
export default PaymentScreen;
