import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../shared';
import CustomDatePicker from '../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    netConnected,
    importantCatListRequest,

}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [_id, updateId] = useState('1')
    const [date, updateDate] = useState(moment(new Date()).format("DD-MM-yyyy"))
    const [selectedDate, updateSelectedDate] = useState(new Date())

    const selectDate = (date) => {
        updateSelectedDate(date)
        let selectedDate = moment(date).format("DD-MM-yyyy")
        updateDate(selectedDate)
        console.log("selectedDate", selectedDate)
    }
    useEffect(() => { fetchData(true, 1, date) }, [])

    const updateStream = (_id) => {
        updateId(_id)
        fetchData(true, _id, date)
    }
    const fetchData = (refresh = false, _id, date) => {
        toggleLoading(!refresh);
        toggleRefreshing(refresh);
        let payload = {
            netConnected,
            _id,
            date,
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
        importantCatListRequest(payload)
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={'Important'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
            changeFilter={(id) => updateStream(id)}
            showFilter
            headerRight={ICONS.CALENDAR}
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
                    onRefresh={() => fetchData(true)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _category } = item;
                    return (<TouchableOpacity onPress={() => navigation.navigate(ROUTES.IMPORTANT.SUB_CATEGORY, { _id: _id })}
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text>{_category}</Text>
                    </TouchableOpacity>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default FriendsScreen;