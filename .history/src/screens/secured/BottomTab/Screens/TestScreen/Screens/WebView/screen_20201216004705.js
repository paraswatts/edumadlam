import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { ScreenHOC } from '../../../components';
import { COLORS } from '../../../shared';

const WebViewScreen = ({
    navigation,
    // route: { params: { title = '', uri = '' } = {} }
}) => {
    const [loading, toggleLoading] = useState(false);
    console.log("title", title)
    return (
        <ScreenHOC
            showHeader
            showBackIcon
            headerTitle={title}
            onBackPress={navigation.goBack}
        >{
                console.log("uriuriuri", uri)
            }
            <WebView
                onNavigationStateChange={(webViewState) => {
                    console.log(webViewState.url)
                    if (webViewState.url === "http://payment.sucess") {
                        //navigate or close webview
                    }
                }
                }
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </ScreenHOC>
    );
}
export default WebViewScreen;
