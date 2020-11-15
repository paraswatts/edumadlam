import React, { useState } from 'react';
import { Text, UIManager, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS, _scaleText, TEXT_CONST, ROUTES } from '../../../../../shared';
import { CustomButton } from '../../../../../components'
import styles from './styles'
let categories = [
    {
        _id: 0,
        _title: "Video Categories",
        _route: ROUTES.TEST.CATEGORY
    },
    {
        _id: 1,
        _title: "Purchased Video Series",
        _route: ROUTES.TEST.PURCHASED_SERIES
    },

    {
        _id: 3,
        _title: "Youtube Videos",
        _route: ROUTES.VIDEO.YOUTUBE_VIDEOS
    }
]
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    const [data, updateData] = useState(categories)
    const goToRoute = (routeName) => {
        navigation.navigate(routeName)
    }
    return (
        <ScreenHOC

            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={'Test Series'}
            showHeader
            showMenuIcon
            onBackPress={navigation.goBack}
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
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text>{_title}</Text>

                    </TouchableOpacity>)
                }}
            />
        </ScreenHOC>
    );
}

export default FriendsScreen;