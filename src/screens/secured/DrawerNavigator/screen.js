import React, { useEffect } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyProfile, MyPurchaseHistory, MonthlyMagzine } from './Screens';
import BottomTab from '../BottomTab/index';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES, _showCustomToast, _scaleText, _handleNotifications, navigationRef, TEXT_CONST } from '../../../shared';
import { CustomDrawer } from '../../../components';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import NetInfo from "@react-native-community/netinfo";

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
        messaging().onMessage((message) => {
            console.log("message", message)
            if (Platform.OS === 'ios') {
                PushNotificationIOS.presentLocalNotification({
                    alertBody: message?.notification?.body,
                    alertTitle: message?.notification?.title,
                    userInfo: message?.data
                })
            }
            // else {
            //     PushNotification.localNotification({
            //         title: message?.notification?.title,
            //         message: message?.notification?.body,
            //         userInfo: message?.data
            //     })
            // }
        })
        // PushNotificationIOS.addEventListener('localNotification', onRemoteNotification);
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
            NetInfo.fetch().then(networkState => {
                if (networkState.isConnected) {
                    loginVerifyRequest({
                        netConnected,
                        payload: { sId: sId, imei: DeviceInfo.getUniqueId() },
                        success: () => {
                            getUserDetailsRequest({
                                netConnected,
                                payload: { sId: sId },
                                success: () => {

                                },
                                fail: (message) => _showCustomToast({ message, type: 'error' })
                            })
                        },
                        fail: (message) => {
                            console.log("message", message)
                            if (netConnected) {
                                _showCustomToast({ message: message, type: 'error' })
                                logoutRequest({ verify: true })
                                navigation.navigate(ROUTES.SIGNIN_SCREEN)
                            }
                            else {
                                _showCustomToast({ message: TEXT_CONST.INTERNET_ERROR, type: 'error' })
                            }
                        }
                    })
                } else {
                    _showCustomToast({ message: TEXT_CONST.INTERNET_ERROR, type: 'error' })
                }
            });

        }

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                if (notification.userInteraction == true) {
                    _handleNotifications({ data: notification.data });
                }
                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,

            // Should the initial notification be popped automatically
            // default: true

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
        });

    }, [sId])

    const onRemoteNotification = (notification) => {
        console.log("notification=====", notification._data)

        _handleNotifications({ data: notification._data });
        //console.log('iOS on CLick Notification Data=============>', JSON.stringify(notification))


        //const isClicked = notification.getData().userInteraction === 1

        // if (isClicked) {
        //   navigationRef.current?.dispatch(StackActions.push(CHAT_SCREEN, notification.data));
        // }
    };


    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            messaging()
                .subscribeToTopic('edumandalaTest')
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
