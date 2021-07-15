import React, { useState, useEffect } from 'react';
import { Text, View, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import momemt from 'moment'
import WebView from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import { isTablet } from 'react-native-device-info';
const INJECTEDJAVASCRIPT = `<style>body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
    </style>
  `;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestDetailScreen = ({
    navigation,
    route: { name, params: { _id, _webPage, _heading } = {} }
}) => {
    console.log("webpage", _webPage)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.WHITE, }}
            headerTitle={_heading}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >

            <View style={{ padding: 10, flex: 1 }}>
                <WebView
                    showsVerticalScrollIndicator={false}

                    source={{ html: INJECTEDJAVASCRIPT + '<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0">' + _webPage }} style={{ flex: 1, borderWidth: 0 }} />
                {/* <HTMLView stylesheet={styles} addLineBreaks={true} value={_webPage.replace(/(\r\n|\n|\r)/gm, "")} /> */}
            </View>

        </ScreenHOC>
    );
}


const styles = StyleSheet.create({
    a: {
        color: COLORS.BLUE_FONT, // make links coloured pink,
        fontSize: _scaleText(12).fontSize
    },
    p: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h1: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h2: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h3: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h4: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h5: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
    h6: {
        color: COLORS.BLUE_FONT, // make links coloured pink
        fontSize: _scaleText(12).fontSize
    },
});

export default TestDetailScreen;