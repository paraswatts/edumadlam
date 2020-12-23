import React, { useEffect, useState } from 'react';
import { Text, UIManager, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { ScreenHOC, EmptyDataUI } from '../../../../../components';
import { COLORS, _showCustomToast, TEXT_CONST, } from '../../../../../shared';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    getUserPurchaseHistoryRequest,
    sId,
    netConnected
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    useEffect(() => {
        console.log("hererer")
        fetchData(true)
    })
    const fetchData = (refresh = false) => {
        console.log("sIdsId", sId)
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            sId: 725,
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
        console.log("getUserPurchaseHistoryRequest", payload)
        getUserPurchaseHistoryRequest(payload)
    }

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'My Purchase History'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item.Id + ''}
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
                    let { Id, Amount, Name } = item;
                    return (<View
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500' }}>{Name}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, color: COLORS.BLUE_FONT }}>
                            <Text style={styles.fontBold}>{TEXT_CONST.PRICE}</Text>{`₹${Amount}`}</Text>

                    </View>)
                }}
            />
        </ScreenHOC>
    );
}

export default FriendsScreen;