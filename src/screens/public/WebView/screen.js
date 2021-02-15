import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { ScreenHOC } from '../../../components';
import { COLORS } from '../../../shared';

const WebViewScreen = ({
    navigation,
    route: { params: { title = '', uri = '' } = {} }
}) => {
    const [loading, toggleLoading] = useState(false);
    return (
        <ScreenHOC
            showHeader
            showBackIcon
            headerTitle={title}
            onBackPress={navigation.goBack}
        >
            <WebView
                onError={() => toggleLoading(false)}
                onLoadEnd={() => toggleLoading(false)}
                onLoadStart={() => toggleLoading(true)}
                source={{ uri: uri }}
            />
            {loading && <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color={COLORS.GREY._2}
                />
            </View>}
        </ScreenHOC>
    );
}
export default WebViewScreen;
