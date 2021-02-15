import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../shared';
import CustomDatePicker from '../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import FastImage from 'react-native-fast-image';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    netConnected,
    newsCatListRequest,
    selectedStream
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [_id, updateId] = useState(selectedStream)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())

    const selectDate = (date) => {
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateSelectedDate(date)
        updateDate(selectedDate)
    }
    const updateStream = (_id) => {
        updateId(_id)
        fetchData(true, _id)
    }
    useEffect(() => { fetchData(true, selectedStream) }, [])
    useEffect(() => { fetchData(true, selectedStream) }, [selectedStream])
    const fetchData = (refresh = false, _id) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            _id,
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
        newsCatListRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={TEXT_CONST.NEWS}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
            changeFilter={(id) => updateStream(id)}
            showFilter
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
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => fetchData(true, _id)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _category, _imgUrl } = item;
                    return (<TouchableOpacity onPress={() => navigation.navigate(ROUTES.NEWS.SUB_CATEGORY, { _id: _id, _category: _category })}
                        style={{
                            flexDirection: 'row',
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, elevation: 5, backgroundColor: COLORS.WHITE
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
                        <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(12).fontSize, fontWeight: '500', flex: 1, padding: _scaleText(20).fontSize, }}>{_category}</Text>
                    </TouchableOpacity>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default FriendsScreen;