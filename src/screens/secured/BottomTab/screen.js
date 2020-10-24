import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyMCQScreen, ImportantScreen, NewsScreen, TestScreen, VideoScreen } from './Screens';
import { CustomBottomTab } from '../../../components';
import { ROUTES } from '../../../shared';

const Tab = createBottomTabNavigator();

const BottomTab = ({
}) => (
        <Tab.Navigator
            backBehavior='initialRoute'
            tabBar={props => <CustomBottomTab {...props} />}
        >
            <Tab.Screen name={ROUTES.BOTTOM_TAB.DAILY_MCQ} component={DailyMCQScreen} />
            <Tab.Screen name={ROUTES.BOTTOM_TAB.IMPORTANT} component={ImportantScreen} />
            <Tab.Screen name={ROUTES.BOTTOM_TAB.NEWS} component={NewsScreen} />
            <Tab.Screen name={ROUTES.BOTTOM_TAB.TEST_SERIES} component={TestScreen} />
            <Tab.Screen name={ROUTES.BOTTOM_TAB.VIDEO_SERIES} component={VideoScreen} />
        </Tab.Navigator>
    );

export default BottomTab;
