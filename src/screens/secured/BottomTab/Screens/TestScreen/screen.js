import React, { useState } from 'react';
import { Text, UIManager, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS, _scaleText, TEXT_CONST, ROUTES } from '../../../../../shared';
import { CustomButton } from '../../../../../components'
import styles from './styles'
import { isTablet } from 'react-native-device-info';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    authToken
}) => {
    const goToRoute = (routeName, _id) => {
        console.log(authToken, "=====")
        if (authToken || _id === 0) {
            navigation.navigate(routeName)
        }
        else {
            navigation.navigate(ROUTES.SIGNIN_SCREEN)
        }
    }
    console.log("authToken", authToken ? true : false)
    let array = [
        {
            _id: 0,
            _title: TEXT_CONST.TEST_SERIES_CATEGORIES,
            _route: ROUTES.TEST.CATEGORY,
        },
        {
            _id: 1,
            _title: TEXT_CONST.PURCHASED_TEST_SERIES,
            _route: ROUTES.TEST.PURCHASED_SERIES,
        },

        {
            _id: 3,
            _title: TEXT_CONST.PURCHASED_TESTS,
            _route: ROUTES.TEST.PURCHASED_TESTS,
        }
    ]
    const [categories, updateCategories] = useState(array)
    return (
        <ScreenHOC

            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={TEXT_CONST.TEST_SERIES}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={categories}
                extraData={categories}
                keyExtractor={(item, index) => item._id + ''}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _title, _route } = item;
                    return (<TouchableOpacity onPress={() => goToRoute(_route, _id)}
                        style={{
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: _scaleText(20).fontSize, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                        <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: isTablet() ? _scaleText(14).fontSize : _scaleText(12).fontSize }}>{_title}</Text>

                    </TouchableOpacity>)
                }}
            />
        </ScreenHOC>
    );
}

export default FriendsScreen;