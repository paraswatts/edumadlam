import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomTestItem } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestSeriesList = ({
    navigation,
    netConnected,
    testListRequest,
    route: { name, params: { _id } = {} },
    sId
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        console.log("sIdsId", sId)
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            sId: sId,
            success: (response = []) => {
                console.log("response", response)
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
        console.log("payload sub cat", payload)
        testListRequest(payload)
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={TEXT_CONST.PURCHASED_TESTS}
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
                    let { _id, _test, _testDuration, _attemptsLeft } = item;
                    return (<View
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text>{_test}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10 }}><Text style={styles.fontBold}>Attempts Left: </Text>{_attemptsLeft}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10 }}><Text style={styles.fontBold}>Test Duration: </Text>{_testDuration} minutes</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TEST.QUESTIONS, { id: _id, _testDuration: _testDuration, _test: _test })} style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
                            <Text style={[styles.fontBlue, { textAlign: 'right', marginRight: _scaleText(5).fontSize }]}>Start Test</Text>
                            <Ionicons name="arrow-forward-circle-outline" size={18} color='blue' />
                        </TouchableOpacity>
                    </View>)
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC>
    );
}

export default TestSeriesList;