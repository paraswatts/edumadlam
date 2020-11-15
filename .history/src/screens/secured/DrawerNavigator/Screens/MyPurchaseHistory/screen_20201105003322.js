import React from 'react';
import { Text, UIManager } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS } from '../../../../../shared';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'My Profile'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <Text>My Purchase History Screen</Text>
        </ScreenHOC>
    );
}

export default FriendsScreen;