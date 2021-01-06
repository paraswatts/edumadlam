import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesListScreen = ({
    navigation,
    netConnected,
    testCatListRequest,
    generatePaymentLinkRequest,
    sId,
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
        fetchData(true, _id, date)
    }
    useEffect(() => { fetchData(true, selectedStream, date) }, [])
    useEffect(() => { fetchData(true, selectedStream, date) }, [selectedStream])
    const fetchData = (refresh = false, _id, date) => {
        toggleLoading(!refresh);
        toggleRefreshing(refresh);
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
        testCatListRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })

    const fetchPaymentPage = (paymentObj) => {
        toggleLoading(true);
        let payload = {
            netConnected,
            amount: paymentObj.amount,
            purpose: paymentObj.purpose.replace(/\s+/g, ''),
            sId,
            type: 'testSeries',
            productId: paymentObj.productId,
            success: (response = []) => {
                console.log("response", response.status)
                let res = response && response.length && response[0]
                if (res && res.status && res.status == 1) {
                    let _webPage = res && res.response
                    console.log(res, "_webPage", _webPage)
                    navigation.navigate(ROUTES.TEST.PAYMENT_SCREEN, { _webPage: _webPage })
                }

                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        console.log("payload payment", payload)
        generatePaymentLinkRequest(payload)
    }
    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={TEXT_CONST.TEST_SERIES_LIST}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
            changeFilter={(id) => updateStream(id)}
            showFilter
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
                    let { _id, _category, _price } = item;
                    return (<TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.LIST, { _id: _id, _category: _category, _price: _price })}
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500' }}>{_category}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, color: COLORS.BLUE_FONT }}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>
                        {parseInt(_price) > 0 ? <TouchableOpacity onPress={() => fetchPaymentPage({ amount: _price, purpose: _category, productId: _id })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                            <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                            <Ionicons name="arrow-forward-circle-outline" size={18} color='blue' />
                        </TouchableOpacity> : null}
                    </TouchableOpacity>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default TestSeriesListScreen;