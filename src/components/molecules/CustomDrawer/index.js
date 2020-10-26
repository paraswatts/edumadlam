import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { COLORS, _scaleText, TEXT_STYLES, ROUTES, ICONS } from '../../../shared';
import { isTablet } from 'react-native-device-info';

import { Alert, View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { logoutRequest } from '../../../redux/actions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const TABS = [
    {
        key: 0,
        title: ROUTES.BOTTOM_TAB_DASHBOARD,
    },
    {
        key: 1,
        title: ROUTES.MY_PROFILE,
    }, {
        key: 2,
        title: 'Logout',
    }
]


function CustomDrawer({ navigation,
    logoutRequest,
    state }) {

    const logout = () => {

        Alert.alert(
            'Logout',
            'Are you sure you want to logout',
            [
                {
                    text: 'Yes',
                    onPress: () => logoutRequest()
                },
                {
                    text: 'No',
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
            <SafeAreaView style={{ backgroundColor: 'white', }} />
            <View style={{ borderBottomWidth: 1, borderColor: 'rgba(33, 150, 243,0.1)', height: 120, justifyContent: 'center', paddingLeft: 10 }}>
                <FastImage
                    style={{ height: 80, width: 80, borderRadius: 40 }}
                    resizeMode={'contain'}
                    source={{ uri: 'https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png' }}
                />
                <Text>paras.watts@gmail.com</Text>
            </View>
            {TABS.map((item, index) => {
                let { title, key, selectedIcon, defaultIcon } = item;
                let active = state.index == key;
                return (index == 2 ? <TouchableOpacity style={styles.draweritem(active)} onPress={logout} key={key}>
                    <Text style={styles.drawerlabel(active)}>{title}</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.draweritem(active)} onPress={() => navigate(title)} key={key}>
                        <Text style={styles.drawerlabel(active)}>{title}</Text>
                    </TouchableOpacity>)
            })}
        </View >
    );
}


const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(logoutRequest())
    }
}

const styles = StyleSheet.create({
    draweritem: active => ({
        borderRadius: 5,
        margin: 5,
        padding: 10,
        backgroundColor: active ? 'rgba(33, 150, 243,0.3)' : null
    }),
    drawerlabel: active => ({
        color: active ? 'rgb(33, 150, 243)' : COLORS.BLACK
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

export default connect(null, mapDispatchToProps)(CustomDrawer);

