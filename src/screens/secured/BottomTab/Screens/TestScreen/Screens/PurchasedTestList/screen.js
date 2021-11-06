import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomTestItem } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { isTablet } from 'react-native-device-info';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesList = ({
    navigation,
    netConnected,
    testListRequest,
    route: { name, params: { _id, _name, catId } = {} },
    sId,
    stopLoading
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    // useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            sId: sId,
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
        if (catId) {
            payload.catId = catId
        }
        testListRequest(payload)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            fetchData(true)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
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
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
        }
    })

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={_name ? _name : TEXT_CONST.PURCHASED_TESTS}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >

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
                    let { _id, _test, _testDuration, _attemptsLeft, _imgUrl } = item;
                    return (<View
                        style={{
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
                            </FastImage> : null}
                        <View style={{ padding: _scaleText(20).fontSize, flex: 1 }}>
                            <Text style={{ fontSize: _scaleText(14).fontSize }}>{_test}</Text>
                            <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, fontSize: _scaleText(14).fontSize }}><Text style={styles.fontBold}>Attempts Left: </Text>{_attemptsLeft}</Text>
                            <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, fontSize: _scaleText(14).fontSize }}><Text style={styles.fontBold}>Test Duration: </Text>{_testDuration} minutes</Text>
                            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.QUESTIONS, { id: _id, _testDuration: _testDuration, _test: _test })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginTop: _scaleText(8).fontSize }}>
                                <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize, fontSize: _scaleText(12).fontSize }]}>Start Test</Text>
                                <Ionicons name="arrow-forward-circle-outline" size={isTablet() ? _scaleText(15).fontSize : _scaleText(14).fontSize} color='blue' />
                            </TouchableOpacity>
                        </View>
                    </View>)
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC >
    );
}

export default TestSeriesList;