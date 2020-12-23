import React, { useState, useEffect } from 'react';
import { View, Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import YouTube from 'react-native-youtube';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const VideosScreen = ({
    navigation,
    netConnected,
    videoListRequest,
    route: { name, params: { catId, _name } = {} },
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [_id, updateId] = useState(catId)
    const [date, updateDate] = useState(moment(new Date()).format("DD-MM-yyyy"))
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [link, updateLink] = useState(false)
    const [currentIndex, updateCurrentIndex] = useState(0)

    // const selectDate = (date) => {
    //     let selectedDate = moment(date).format("DD-MM-yyyy")
    //     updateSelectedDate(date)
    //     updateDate(selectedDate)
    // }
    // const updateStream = (_id) => {
    //     updateId(_id)
    //     fetchData(true, _id, date)
    // }
    useEffect(() => { fetchData(true, _id, date) }, [])
    const fetchData = (refresh = false, _id, date) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            _id,
            success: (response = []) => {
                console.log("response", response)
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
        console.log("payload", payload)
        videoListRequest(payload)
    }

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
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={_name}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
            changeFilter={(id) => updateStream(id)}
            // showFilter
            // headerRight={ICONS.CALENDAR}
            onRightPress={() => updateShowDate(true)}
        >
            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={() => {
                        fetchData(true, 1, date)
                        updateShowDate(false)
                    }} />
            }
            {link ?
                <YouTube
                    apiKey='AIzaSyAanj5hB1lBH5XDmuTpLXoD47LM_0OerGI'
                    videoId={getVideoIdFromUrl(link)} // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    // onReady={e => this.setState({ isReady: true })}
                    // onChangeState={e => this.setState({ status: e.state })}
                    // onChangeQuality={e => this.setState({ quality: e.quality })}
                    // onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300 }}
                /> : null}
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
                    let { _id, _name, _link, _webPage } = item;
                    return (
                        <TouchableOpacity onPress={() => {
                            updateCurrentIndex(index)
                            updateLink(_link)
                        }} style={{ padding: _scaleText(5).fontSize, backgroundColor: currentIndex === index ? 'rgba(40, 59, 244, 0.3)' : 'transparent' }}><View
                            style={{
                                shadowColor: '#b2b2b2',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 1, borderRadius: 10, marginHorizontal: _scaleText(5).fontSize, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                            }}>
                                <Text>{_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default VideosScreen;