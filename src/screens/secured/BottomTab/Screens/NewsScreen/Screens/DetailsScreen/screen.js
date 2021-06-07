import React, { useState, useEffect } from 'react';
import { Text, View, UIManager, FlatList, ActivityIndicator, RefreshControl, Image, useWindowDimensions, SafeAreaView, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import momemt from 'moment'
import WebView from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import HTML from "react-native-render-html";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';

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
const NewsDetailScreen = ({
    navigation,
    netConnected,
    newsDetailRequest,
    route: { name, params: { _id, _heading } = {} },
    stopLoading
}) => {
    const [loading, toggleLoading] = useState(false);
    const [data, updateData] = useState(false);
    useEffect(() => { fetchData(true) }, [])
    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleValidateClose
        );
        return () => handler.remove();
    }, []);
    const handleValidateClose = () => {
        /* Here is empty */
        stopLoading();
    };
    const fetchData = (refresh = false) => {
        toggleLoading(true);
        let payload = {
            netConnected,
            id: _id,
            success: (response = []) => {
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        newsDetailRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleLoading(false);
        }
    })

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    const replaceString = (str) => {
        let _questUpdated = str.replace(/(\r\n|\n|\r)/gm, "")
        _questUpdated = _questUpdated.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
        _questUpdated = _questUpdated.replace(/<[^/>][^>]*><\/[^>]+>/g, "")
        return _questUpdated
    }
    const renderers = {
        // img: extendDefaultRenderer("img", {
        //     contentModel: HTMLContentModel.mixed,
        // }),
    };

    const drawImageScaled = (img) => {
        let screenSize = Dimensions.get('window');
        let hRatio = screenSize.width / img.width;
        let vRatio = screenSize.height / img.height;
        let ratio = Math.min(hRatio, vRatio);
        return { width: parseInt(img.width * ratio), height: parseInt(img.height * ratio) };
    }

    const openSharing = (_link) => {
        const shareOptions = {
            title: 'Edumandala News',
            failOnCancel: false,
            urls: [_link],
        };
        Share.open(shareOptions)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }


    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.WHITE, }}
            headerTitle={_heading}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >
            {/* <View style={{ flex: 1 }}> */}
            {data && data.length &&
                <View style={{ padding: _scaleText(10).fontSize, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: _scaleText(16).fontSize }}>{data[0]._heading}</Text>
                    <Text style={{
                        fontSize: _scaleText(10).fontSize, marginBottom: 10, fontWeight: 'bold'
                    }}>{data[0]._timestamp}</Text>

                    <FastImage
                        style={{ height: 150 }}
                        resizeMode={'contain'}
                        source={{ uri: data[0]._imgUrl }}
                    />
                    <MaterialIcons name="share" size={_scaleText(24).fontSize} color='blue' style={{ alignSelf: 'flex-end', padding: 10 }} onPress={() => openSharing(data[0]._link ? data[0]._link : 'www.edumandala.com')} />

                    {/* <View style={{ marginHorizontal: _scaleText(10).fontSize }}> */}
                    <WebView
                        showsVerticalScrollIndicator={false}

                        source={{ html: INJECTEDJAVASCRIPT + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">' + data[0]._news }} style={{ flex: 1, borderWidth: 0 }} />
                    {/* <HTML imagesMaxWidth={Dimensions.get('window').width} tagsStyles={styles} source={{ html: replaceString(data[0]._news) }} /> */}

                    {/* <HTMLView stylesheet={styles} addLineBreaks={true} value={replaceString(data[0]._news)} /> */}
                    {/* </View> */}
                </View>}
            {loading && <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center' }}>
                <ActivityIndicator
                    size='large'
                    color={COLORS.GREY._2}
                />
            </View>}
            {/* </View> */}

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

export default NewsDetailScreen;