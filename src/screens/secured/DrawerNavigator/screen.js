import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile, MyPurchaseHistory, MonthlyMagzine } from './Screens';
import BottomTab from '../BottomTab/index';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES, _showCustomToast, _scaleText, _handleNotifications, navigationRef } from '../../../shared';
import { CustomDrawer } from '../../../components';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const Drawer = createDrawerNavigator();
const LogoutButton = () => (
    null
)
const DrawerNavigator = ({
    params,
    netConnected,
    getUserDetailsRequest,
    loginVerifyRequest,
    sId,
    userData,
    navigation,
    logoutRequest
}) => {

    useEffect(() => {
        requestUserPermission()

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log("remoteMessage-=====", remoteMessage)

            _handleNotifications(remoteMessage);
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                console.log("remoteMessage", remoteMessage)
                if (remoteMessage) {
                    _handleNotifications(remoteMessage);
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                }
            });
        if (sId) {
            loginVerifyRequest({
                netConnected,
                payload: { sId: sId, imei: DeviceInfo.getUniqueId() },
                success: () => {

                },
                fail: (message) => {
                    logoutRequest()
                    navigation.navigate(ROUTES.SIGNIN_SCREEN)
                }
            })
            getUserDetailsRequest({
                netConnected,
                payload: { sId: sId },
                success: () => {

                },
                fail: (message) => _showCustomToast({ message, type: 'error' })
            })
        }
    }, [sId])
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            messaging()
                .subscribeToTopic('edumandala')
                .then(() => console.log('Subscribed to topic!'));
            console.log('Authorization status:', authStatus);
            // getDeviceToken();
        }
    }
    console.log("drawer")
    return (

        <Drawer.Navigator
            drawerStyle={{
                width: _scaleText(240).fontSize,
            }}
            detachInactiveScreens initialRouteName={ROUTES.BOTTOM_TAB_DASHBOARD} drawerContent={(props) => <CustomDrawer sId={sId} logoutRequest={logoutRequest}{...props} userData={userData} />} >
            <Drawer.Screen name={ROUTES.BOTTOM_TAB_DASHBOARD} component={BottomTab} />
            <Drawer.Screen name={ROUTES.MY_PROFILE} component={MyProfile} />
            <Drawer.Screen name={ROUTES.MY_PURCHASE_HISTORY} component={MyPurchaseHistory} />
            <Drawer.Screen name={ROUTES.MONTHLY_MAGAZINE} component={MonthlyMagzine} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
