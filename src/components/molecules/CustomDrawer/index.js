import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { COLORS, _scaleText, TEXT_STYLES, ROUTES, ICONS, TEXT_CONST } from '../../../shared';
import { isTablet } from 'react-native-device-info';

import { Alert, View, SafeAreaView, Text, StyleSheet, Platform, Linking } from 'react-native';
import { logoutRequest, updateShowPopup } from '../../../redux/actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';




function CustomDrawer({ navigation,
    logoutRequest,
    userData,
    sId,
    state }) {
    const TABS = [
        {
            key: 0,
            title: ROUTES.BOTTOM_TAB_DASHBOARD,
            isRoute: true,
            isShown: true
        },
        {
            key: 1,
            title: ROUTES.MY_PROFILE,
            isRoute: true,
            isShown: sId ? true : false
        },
        {
            key: 2,
            title: ROUTES.MY_PURCHASE_HISTORY,
            isRoute: true,
            isShown: sId ? true : false
        }, {
            key: 3,
            title: ROUTES.MONTHLY_MAGAZINE,
            isRoute: true,
            isShown: true
        },
        {
            key: 4,
            title: TEXT_CONST.RATE_US,
            isRoute: false,
            onPress: () => {
                navigation.toggleDrawer()
                let appUrl = Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/us/app/edumandala/id1553296777?mt=8' : 'https://play.google.com/store/apps/details?id=com.edumandala'
                Linking.canOpenURL(appUrl).then(supported => {
                    supported && Linking.openURL(appUrl);
                }, (err) => console.log(err));

            },
            isShown: true
        },
        {
            key: 5,
            title: TEXT_CONST.SHARE_APP,
            isRoute: false,
            onPress: () => {
                let appUrl = Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/edumandala/id1553296777' : 'https://play.google.com/store/apps/details?id=com.edumandala'
                const shareOptions = {
                    title: 'Share EduMandala',
                    failOnCancel: false,
                    urls: [appUrl],
                };

                navigation.toggleDrawer()
                Share.open(shareOptions)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
            },
            isShown: true
        },
        {
            key: 6,
            title: TEXT_CONST.LOGOUT,
            isRoute: false,
            onPress: () => {
                navigation.toggleDrawer()
                logout()
            },
            isShown: sId ? true : false
        },
    ]
    const logout = () => {

        Alert.alert(
            TEXT_CONST.LOGOUT,
            TEXT_CONST.LOGOUT_ALERT,
            [
                {
                    text: TEXT_CONST.YES,
                    onPress: () => {
                        updateShowPopup(false)
                        logoutRequest()
                    },
                },
                {
                    text: TEXT_CONST.NO,
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }
    const navigate = (route) => {
        navigation.closeDrawer()
        navigation.navigate(route)
    }


    return (
        <View style={{ borderWidth: 0, flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: COLORS.PRIMARY.YELLOW, }} />
            <View style={{ backgroundColor: COLORS.PRIMARY.YELLOW, borderWidth: 0, justifyContent: 'center', padding: _scaleText(10).fontSize }}>
                <FastImage
                    style={{ height: _scaleText(48).fontSize, width: _scaleText(48).fontSize, borderRadius: _scaleText(40).fontSize }}
                    resizeMode={'contain'}
                    source={require('../../../assets/icons/app_icon.png')}
                />
                {sId ? <View>
                    <Text style={{ fontSize: _scaleText(14).fontSize, fontWeight: 'bold', color: COLORS.WHITE, marginTop: _scaleText(10).fontSize, textTransform: 'capitalize' }}>{userData._name}</Text>
                    <Text style={{ color: COLORS.WHITE, marginTop: _scaleText(5).fontSize, fontSize: _scaleText(14).fontSize }}>{userData._email}</Text>
                </View> :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => navigate(ROUTES.SIGNIN_SCREEN)}>
                            <Text style={{ fontSize: _scaleText(14).fontSize, fontWeight: 'bold', color: COLORS.WHITE, marginTop: _scaleText(10).fontSize, textTransform: 'capitalize' }}>{TEXT_CONST.SIGN_IN}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate(ROUTES.SIGNUP_SCREEN)}>
                            <Text style={{ fontSize: _scaleText(14).fontSize, fontWeight: 'bold', color: COLORS.WHITE, marginTop: _scaleText(10).fontSize, textTransform: 'capitalize' }}>{TEXT_CONST.SIGNUP}</Text>
                        </TouchableOpacity>
                    </View>}

            </View>
            {TABS.map((item, index) => {
                let { title, key, isRoute, isShown } = item;
                let active = state.index == key;
                return (isShown ? <TouchableOpacity style={styles.draweritem(active)} onPress={() => isRoute ? navigate(title) : item.onPress()} key={key}>
                    <Text style={styles.drawerlabel(active)}>{title}</Text>
                </TouchableOpacity> : null)
            })}
        </View >
    );
}


const styles = StyleSheet.create({
    draweritem: active => ({
        borderRadius: _scaleText(5).fontSize,
        margin: _scaleText(5).fontSize,
        padding: _scaleText(10).fontSize,
        backgroundColor: active ? COLORS.PRIMARY.YELLOW : null
    }),
    drawerlabel: active => ({
        color: active ? COLORS.WHITE : COLORS.BLUE_FONT,
        fontSize: _scaleText(14).fontSize
    }),
    backImage: {
        backgroundColor: 'transparent',
        height: _scaleText(isTablet() ? 90 : 54).fontSize,
        justifyContent: 'center',
        paddingBottom: _scaleText(isTablet() ? 20 : 0).fontSize,
        bottom: -_scaleText(isTablet() ? 20 : 0).fontSize,
        width: '100%',
    },
    container: {
        flexDirection: 'row'
    },
    tabContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: _scaleText(5).fontSize,
    },
    createContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: _scaleText(5).fontSize,
    },
    create: {
        position: 'absolute',
        top: -_scaleText(isTablet() ? 35 : 27).fontSize
    },
    title: active => ({
        ...TEXT_STYLES.BODY4,
        color: active ? COLORS.PRIMARY.PINK : COLORS.GREY.MEDIUM,
        fontFamily: active ? 'Inter-SemiBold' : 'Inter-Regular',
        marginTop: _scaleText(2).fontSize,
    })
})

export default CustomDrawer;

