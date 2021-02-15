import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import CustomDatePicker from '../../../../../../../components/molecules/CustomDatePicker'
import moment from 'moment'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { isTablet } from 'react-native-device-info';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesListScreen = ({
    navigation,
    netConnected,
    testCatListRequest,
    generatePaymentLinkRequest,
    sId,
    selectedStream,
    stopLoading
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
                let res = response && response.length && response[0]
                if (res && res.status && res.status == 1) {
                    let _webPage = res && res.response
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
                numColumns={isTablet() ? 1 : 1}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _category, _price, _imgUrl } = item;
                    return (<View
                        style={{
                            flex: 1,
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            flexDirection: 'row',
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        {_imgUrl ?
                            <FastImage

                                resizeMode='contain'
                                source={{ uri: _imgUrl }}
                                style={{
                                    width: _scaleText(80).fontSize, height: '100%', borderTopLeftRadius: _scaleText(10).fontSize,
                                    borderBottomLeftRadius: _scaleText(10).fontSize
                                }}
                            >
                            </FastImage> : null}<View style={{ padding: _scaleText(20).fontSize, flex: 1 }}>
                            <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: _scaleText(14).fontSize }}>{_category}</Text>
                            <Text style={{ fontWeight: '500', fontSize: _scaleText(12).fontSize, marginTop: 10, color: COLORS.BLUE_FONT }}><Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${_price}`}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: _scaleText(16).fontSize }}>
                                {<TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.LIST, { _id: _id, _category: _category, _price: _price })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.VIEW}</Text>
                                    <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                                </TouchableOpacity>}{parseInt(_price) > 0 ? <TouchableOpacity onPress={() => fetchPaymentPage({ amount: _price, purpose: _category, productId: _id })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                                    <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(13).fontSize }]}>{TEXT_CONST.PURCHASE}</Text>
                                    <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                                </TouchableOpacity> : null}
                            </View>
                        </View>
                    </View>)
                }}
            />
            < SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default TestSeriesListScreen;