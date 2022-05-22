import React, { useState, useEffect } from 'react';
import { View, Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import YouTube from 'react-native-youtube';
import FastImage from 'react-native-fast-image';
import YoutubePlayer from "react-native-youtube-iframe";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const VideosScreen = ({
    navigation,
    netConnected,
    videoListRequest,
    stopLoading
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [_id, updateId] = useState(4)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [link, updateLink] = useState(false)
    const [currentIndex, updateCurrentIndex] = useState(0)
    useEffect(() => { fetchData(true, _id, date) }, [])
    const fetchData = (refresh = false, _id, date) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            _id,
            homePage: true,
            success: (response = []) => {
                updateData(refresh ? [...response] : [...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        videoListRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })

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

    useEffect(() => {
        if (data && data.length) {
            updateLink(data[0]._link)
        }

    }, [data])
    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)
    const getVideoIdFromUrl = (_link) => {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (_link.match(p)) ? RegExp.$1 : false;
    }

    return (
        <>
            {
                link ? <YoutubePlayer
                    height={250}
                    videoId={getVideoIdFromUrl(link)}
                /> : null
            }
            {/* {link ?
                <YouTube
                    apiKey='AIzaSyAanj5hB1lBH5XDmuTpLXoD47LM_0OerGI'
                    videoId={getVideoIdFromUrl(link)} // The YouTube video ID
                    // play // control playback of video with true/false// control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    // onReady={e => this.setState({ isReady: true })}
                    // onChangeState={e => this.setState({ status: e.state })}
                    // onChangeQuality={e => this.setState({ quality: e.quality })}
                    // onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300, marginTop: -2, borderRadius: 20, marginBottom: 12 }}
                /> : null} */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => fetchData(true)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                // style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _name, _link, _webPage, _imgUrl } = item;
                    return (
                        <TouchableOpacity onPress={() => {
                            updateCurrentIndex(index)
                            updateLink(_link)
                        }} style={{ padding: _scaleText(5).fontSize, borderRadius: 20, backgroundColor: currentIndex === index ? 'rgba(40, 59, 244, 0.3)' : 'transparent' }}>
                            <View
                                style={{
                                    shadowColor: '#b2b2b2',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    flexDirection: 'row',
                                    shadowRadius: 1, borderRadius: _scaleText(10).fontSize, marginHorizontal: _scaleText(5).fontSize, marginVertical: _scaleText(5).fontSize, elevation: 5, backgroundColor: COLORS.WHITE
                                }}>

                                {_imgUrl ?
                                    <FastImage

                                        resizeMode='contain'
                                        source={{ uri: _imgUrl }}
                                        style={{
                                            width: _scaleText(60).fontSize, height: '100%', borderTopLeftRadius: _scaleText(10).fontSize,
                                            borderBottomLeftRadius: _scaleText(10).fontSize
                                        }}
                                    >
                                    </FastImage> : null}
                                <Text style={{ padding: _scaleText(20).fontSize, flex: 1 }}>{_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ >
    );
}

export default VideosScreen;