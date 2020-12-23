import React, { useEffect } from 'react';
import { Text, UIManager } from 'react-native';
import { ScreenHOC, _showCustomToast } from '../../../../../components';
import { COLORS } from '../../../../../shared';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    getUserPurchaseHistoryRequest,
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
        if (catId) {
            payload.catId = catId
        }
        console.log("payload sub cat", payload)
        testListRequest(payload)
    }
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'My Purchase History'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <Text>My Purchase History Screen</Text>
        </ScreenHOC>
    );
}

export default FriendsScreen;