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
                console.log("uriuriuri", _webPage)
            }
            <WebView
                source={{ uri: _webPage }}
                startInLoadingState
                onNavigationStateChange={(webViewState) => {
                    console.log(webViewState.url)
                    if (webViewState.url.includes === "sdemo.in") {
                        navigation.goBack()
                    }
                }
                }
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </ScreenHOC>
    );
}
export default PaymentScreen;
