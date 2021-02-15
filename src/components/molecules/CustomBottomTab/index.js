import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { COLORS, _scaleText, TEXT_STYLES, ROUTES, ICONS } from '../../../shared';
import { CustomTouchableIcon } from '../../atoms';
import { isTablet } from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TABS = [
    {
        defaultIcon: ICONS.MCQ_DEFAULT(_scaleText(20).fontSize),
        key: 0,
        selectedIcon: ICONS.MCQ_SELECTED(_scaleText(20).fontSize),
        title: ROUTES.BOTTOM_TAB.DAILY_MCQ,
    },
    {
        defaultIcon: ICONS.IMPORTANT_DEFAULT(_scaleText(20).fontSize),
        key: 1,
        selectedIcon: ICONS.IMPORTANT_SELECTED(_scaleText(20).fontSize),
        title: ROUTES.BOTTOM_TAB.IMPORTANT,
    },
    {
        defaultIcon: ICONS.NEWS_DEFAULT(_scaleText(20).fontSize),
        key: 2,
        selectedIcon: ICONS.NEWS_SELECTED(_scaleText(20).fontSize),
        title: ROUTES.BOTTOM_TAB.NEWS,
    },
    {
        defaultIcon: ICONS.TEST_DEFAULT(_scaleText(20).fontSize),
        key: 3,
        selectedIcon: ICONS.TEST_SELECTED(_scaleText(20).fontSize),
        title: ROUTES.BOTTOM_TAB.TEST_SERIES,
    },
    {
        defaultIcon: ICONS.VIDEO_DEFAULT(_scaleText(20).fontSize),
        key: 4,
        selectedIcon: ICONS.VIDEO_SELECTED(_scaleText(20).fontSize),
        title: ROUTES.BOTTOM_TAB.VIDEO_SERIES,
    }
]

const CustomBottomTab = ({
    navigation,
    state,
}) => {
    let { bottom } = useSafeAreaInsets();
    return (
        <View style={styles.barContainer}>

            <View style={styles.container}>
                {TABS.map((item, index) => {
                    let { title, key, selectedIcon, defaultIcon } = item;
                    let active = state.index == key;
                    return <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        onPress={() => navigation.navigate(title)}
                        style={styles.tabContainer}
                    >
                        {active ? selectedIcon : defaultIcon}
                        <Text numberOfLines={1} style={styles.title(active)}>{title}</Text>
                    </TouchableOpacity>
                })}
            </View>
            <SafeAreaView style={{ backgroundColor: 'white', }} />

            {!!bottom && <View style={{ width: '100%', height: bottom, backgroundColor: 'white', }} />}
        </View>
    );
}

export default CustomBottomTab;

const styles = StyleSheet.create({
    barContainer: {
        bottom: 0,
        elevation: 5,
        left: 0,
        position: 'absolute',
        right: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        backgroundColor: 'white'
    },
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
        marginTop: _scaleText(2).fontSize,
        fontSize: _scaleText(14).fontSize
    })
});