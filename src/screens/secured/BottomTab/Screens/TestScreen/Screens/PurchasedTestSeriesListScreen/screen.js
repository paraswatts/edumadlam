import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES } from '../../../../../../../shared';
import styles from './styles';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const PurchasedTestSeriesList = ({
    navigation,
    netConnected,
    purchasedTestSeriesListRequest,
    route: { name, params: { _id } = {} }
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        console.log("_id_id_id", _id)
        toggleLoading(!refresh);
        toggleRefreshing(refresh);
        let payload = {
            netConnected,
            sId: 883,
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
        purchasedTestSeriesListRequest(payload)
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={'Purchased Test Series List'}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >

            <FlatList
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                showsVerticalScrollIndicator={false}
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
                    let { _id, _name, _price, _timestamp, _startDate, _endDate, _timetable } = item;
                    console.log("_timetable", _timetable)
                    return (<TouchableOpacity
                        onPress={() => navigation.navigate(ROUTES.IMPORTANT.DETAIL, { _id: _id })}
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10 }}><Text style={styles.fontBold}>Name: </Text>{_name}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10 }}><Text style={styles.fontBold}>Price: </Text>{`₹${_price}`}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10 }}><Text style={styles.fontBold}>Start Date: </Text>{_startDate}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10 }}><Text style={styles.fontBold}>End Date: </Text>{_endDate}</Text>
                        {!!_timetable && <TouchableOpacity onPress={() => {
                            try {
                                Linking.openURL(_timetable)
                            } catch (error) {

                                console.log("error", error)
                            }
                        }}><Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 10 }}><Text style={styles.fontBold}>Timetable: </Text><Text style={styles.fontBlue}>{"Timetable"}</Text></Text>
                        </TouchableOpacity>}
                        <Text style={{ textAlign: 'right', bottom: 5, right: 10, position: 'absolute', marginTop: 20, fontSize: 10 }}>{_timestamp}</Text>
                    </TouchableOpacity>)
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC>
    );
}

export default PurchasedTestSeriesList;