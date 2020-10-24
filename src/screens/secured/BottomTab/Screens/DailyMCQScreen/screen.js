import React, { useState } from 'react';
import { Text, UIManager, View } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS } from '../../../../../shared';
import CustomDatePicker from '../../../../../components/molecules/CustomDatePicker'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    const [showDate, updateShowDate] = useState(false)
    return (
        <ScreenHOC
            headerTitle={'Daily MCQ'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
            headerRight={<EvilIcons name="calendar" size={30} />}
            onRightPress={() => updateShowDate(true)}
        >
            <Text>Daily MCQ Screen</Text>
            {showDate &&
                <CustomDatePicker closeDatePicker={() => updateShowDate(false)} />
            }
        </ScreenHOC >
    );
}

export default FriendsScreen;