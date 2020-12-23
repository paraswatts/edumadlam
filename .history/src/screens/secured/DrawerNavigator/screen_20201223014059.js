import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile, MyPurchaseHistory } from './Screens';
import BottomTab from '../BottomTab/index';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES, _showCustomToast } from '../../../shared';
import { CustomDrawer } from '../../../components';

const Drawer = createDrawerNavigator();
const LogoutButton = () => (
    null
)
const DrawerNavigator = ({
    params,
    netConnected,
    getUserDetailsRequest,
    sId,
    userData,
    logoutRequest
}) => {
    console.log("sId", sId)
    useEffect(() => {
        if (sId) {
            getUserDetailsRequest({
                netConnected,
                payload: { sId: sId },
                success: () => {

                },
                fail: (message) => _showCustomToast({ message, type: 'error' })
            })
        }
    }, [sId])

    return (

        <Drawer.Navigator detachInactiveScreens initialRouteName={ROUTES.BOTTOM_TAB_DASHBOARD} drawerContent={(props) => <CustomDrawer logoutRequest={logoutRequest}{...props} userData={userData} />} >
            <Drawer.Screen name={ROUTES.BOTTOM_TAB_DASHBOARD} component={BottomTab} />
            <Drawer.Screen name={ROUTES.MY_PROFILE} component={MyProfile} />
            <Drawer.Screen name={ROUTES.MY_PURCHASE_HISTORY} component={MyPurchaseHistory} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
