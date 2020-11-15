import React, { useState, useEffect } from 'react';
import { Text, View, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import momemt from 'moment'
import WebView from 'react-native-webview';
import HTMLView from 'react-native-htmlview';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const NewsDetailScreen = ({
    navigation,
    netConnected,
    newsDetailRequest,
    route: { name, params: { _id, _heading } = {} }
}) => {
    const [loading, toggleLoading] = useState(false);
    const [data, updateData] = useState(false);
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        console.log("_id_id_id", _id)
        toggleLoading(true);
        let payload = {
            netConnected,
            id: _id,
            success: (response = []) => {
                console.log("response", response)
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        console.log("payload sub cat", payload)
        newsDetailRequest(payload)
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

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
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                    <Text style={{ fontWeight: '500' }}>{data[0]._heading}</Text>

                    <Text style={{ fontSize: 10, marginBottom: 10 }}>{data[0]._timestamp}</Text>

                    <FastImage
                        style={{ height: 150 }}
                        resizeMode={'contain'}
                        source={{ uri: data[0]._imgUrl }}
                    />
                    {/* <View style={{ marginHorizontal: _scaleText(10).fontSize }}> */}
                    {/* <WebView source={{ html: data[0]._news }} /> */}
                    <HTMLView addLineBreaks={false} value={data[0]._news.replace(/(\r\n|\n|\r)/gm, "")} />
                    {/* </View> */}
                </ScrollView>}
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

export default NewsDetailScreen;