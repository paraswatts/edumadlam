
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyMCQScreen, ImportantScreen, NewsScreen, TestScreen, VideoScreen } from './Screens';
import { CustomBottomTab } from '../../../components';
import { ROUTES, ICONS, COLORS, _scaleText } from '../../../shared';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { isTablet } from 'react-native-device-info';

const Tab = createBottomTabNavigator();

const getIcon = (name, color) => {
    return (
        isTablet() ?
            <View style={{ width: _scaleText(25).fontSize }}><MaterialCommunityIcons name={name} color={color} size={_scaleText(20).fontSize} /></View> : <MaterialCommunityIcons name={name} color={color} size={_scaleText(20).fontSize} />
    )
}
const BottomTab = ({
}) => {
    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            tabBarOptions={{
                activeTintColor: COLORS.PRIMARY.DARK,
                labelStyle: {
                    fontSize: _scaleText(10).fontSize,
                },
                // labelPosition: 'below-icon',

            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        getIcon("head-question-outline", color)
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.DAILY_MCQ} component={DailyMCQScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        getIcon("star-box-outline", color)),
                }}
                name={ROUTES.BOTTOM_TAB.IMPORTANT} component={ImportantScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        getIcon("newspaper", color)
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.NEWS} component={NewsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        getIcon("file-document-edit-outline", color)
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.TEST_SERIES} component={TestScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        getIcon("file-video-outline", color)
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.VIDEO_SERIES} component={VideoScreen} />
        </Tab.Navigator >
    )
};

export default BottomTab;

