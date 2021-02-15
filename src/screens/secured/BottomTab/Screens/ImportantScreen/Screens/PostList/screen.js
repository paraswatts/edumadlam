import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomDatePicker } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import moment from 'moment'
import { isTablet } from 'react-native-device-info';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const ImportantSubCategory = ({
    navigation,
    netConnected,
    importantSubCatListRequest,
    route: { name, params: { _id, _category } = {} },
    stopLoading
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [headerDate, updateHeaderDate] = useState(moment(new Date()).format("DD MMM"))

    const selectDate = (date) => {
        updateSelectedDate(date)
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateHeaderDate(moment(date).format("DD MMM"))
        updateDate(selectedDate)
    }

    useEffect(() => { fetchData(true, date) }, [])
    const fetchData = (refresh = false, date) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            catId: _id,
            date,
            success: (response = []) => {
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        importantSubCatListRequest(payload)
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

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={_category}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
            headerRight={ICONS.CALENDAR}
            onRightPress={() => updateShowDate(true)}
            rightText={headerDate}
        >
            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={() => {
                        fetchData(true, date)
                        updateShowDate(false)
                    }} />
            }
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
                numColumns={isTablet() ? 2 : 1}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _heading, _imgUrl, _timestamp } = item;
                    return (
                        <View style={{ borderWidth: 0, flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(ROUTES.IMPORTANT.DETAIL, { _id: _id, _heading: _heading })}
                                style={{
                                    borderWidth: 1,
                                    flex: 1,
                                    shadowColor: '#b2b2b2',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 1, borderRadius: 10,
                                    marginHorizontal: isTablet() ? _scaleText(5).fontSize : _scaleText(10).fontSize, marginVertical: 5,
                                    padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                                }}>
                                <FastImage
                                    style={{ height: 150 }}
                                    resizeMode={'contain'}
                                    source={{ uri: _imgUrl }}
                                />
                                <Text style={{ fontWeight: '500', fontSize: _scaleText(14).fontSize, marginTop: 10, marginBottom: 10, color: COLORS.BLUE_FONT }}>{_heading}</Text>
                                <Text style={{ color: COLORS.BLUE_FONT, textAlign: 'right', bottom: 5, right: 10, position: 'absolute', marginTop: 20, fontSize: _scaleText(10).fontSize }}>{_timestamp}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC>
    );
}

export default ImportantSubCategory;