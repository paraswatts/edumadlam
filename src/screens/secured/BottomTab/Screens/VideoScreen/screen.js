import React, { useState } from 'react';
import { Text, UIManager, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS, _scaleText, TEXT_CONST, ROUTES } from '../../../../../shared';
import { CustomButton } from '../../../../../components'
import styles from './styles'
import { isTablet } from 'react-native-device-info';
let categories = [
    {
        _id: 0,
        _title: "Video Categories",
        _route: null
    },
    {
        _id: 1,
        _title: "Purchased Video Series",
        _route: null
    },

    {
        _id: 3,
        _title: "Youtube Videos",
        _route: ROUTES.VIDEO.YOUTUBE_CATEGORIES
    }
]
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    const [data, updateData] = useState(categories)
    const goToRoute = (routeName) => {
        if (routeName) {
            navigation.navigate(routeName)
        }
    }
    return (
        <ScreenHOC

            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={'Test Series'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _title, _route } = item;
                    return (<TouchableOpacity onPress={() => goToRoute(_route)}
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: _scaleText(20).fontSize, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: _scaleText(isTablet() ? 14 : 12).fontSize }}>{_title}</Text>

                    </TouchableOpacity>)
                }}
            />
        </ScreenHOC>
    );
}

export default FriendsScreen;