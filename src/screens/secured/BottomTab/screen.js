// import React from 'react';
// import { Text, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { DailyMCQScreen, ImportantScreen, NewsScreen, TestScreen, VideoScreen } from './Screens';
// import { CustomBottomTab } from '../../../components';
// import { ROUTES } from '../../../shared';

// const Tab = createBottomTabNavigator();

// const BottomTab = ({
// }) => (
//         <Tab.Navigator
//             backBehavior='initialRoute'
//             tabBar={props => <CustomBottomTab {...props} />}
//         >
//             <Tab.Screen name={ROUTES.BOTTOM_TAB.DAILY_MCQ} component={DailyMCQScreen} />
//             <Tab.Screen name={ROUTES.BOTTOM_TAB.IMPORTANT} component={ImportantScreen} />
//             <Tab.Screen name={ROUTES.BOTTOM_TAB.NEWS} component={NewsScreen} />
//             <Tab.Screen name={ROUTES.BOTTOM_TAB.TEST_SERIES} component={TestScreen} />
//             <Tab.Screen name={ROUTES.BOTTOM_TAB.VIDEO_SERIES} component={VideoScreen} />
//         </Tab.Navigator>
//     );

// export default BottomTab;

import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyMCQScreen, ImportantScreen, NewsScreen, TestScreen, VideoScreen } from './Screens';
import { CustomBottomTab } from '../../../components';
import { ROUTES, ICONS, COLORS } from '../../../shared';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

const BottomTab = ({
}) => (
        <Tab.Navigator
            backBehavior='initialRoute'
            tabBarOptions={{
                activeTintColor: COLORS.PRIMARY.DARK
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="head-question-outline" color={color} size={24} />
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.DAILY_MCQ} component={DailyMCQScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="star-box-outline" color={color} size={24} />
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.IMPORTANT} component={ImportantScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="newspaper" color={color} size={24} />
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.NEWS} component={NewsScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="file-document-edit-outline" color={color} size={24} />
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.TEST_SERIES} component={TestScreen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="ondemand-video" color={color} size={24} />
                    ),
                }}
                name={ROUTES.BOTTOM_TAB.VIDEO_SERIES} component={VideoScreen} />
        </Tab.Navigator >
    );

export default BottomTab;

