import React from 'react';
import { Alert, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile } from './Screens';
import BottomTab from '../BottomTab/index';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from '../../../shared';
import { CustomDrawer } from '../../../components';

const Drawer = createDrawerNavigator();
const LogoutButton = () => (
    null
)
const DrawerNavigator = ({
    params,
}) => (

        <Drawer.Navigator initialRouteName={ROUTES.BOTTOM_TAB_DASHBOARD} drawerContent={(props) => <CustomDrawer {...props} />} >
            <Drawer.Screen name={ROUTES.BOTTOM_TAB_DASHBOARD} component={BottomTab} />
            <Drawer.Screen name={ROUTES.MY_PROFILE} component={MyProfile} />
        </Drawer.Navigator>
    );

export default DrawerNavigator;
