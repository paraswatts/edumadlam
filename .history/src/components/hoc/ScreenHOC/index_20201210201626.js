import React, { useRef } from 'react';
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomHeader, CalenderStrip, CustomTouchableIcon } from '../../';
import { COLORS, TEXT_CONST, _scaleText } from '../../../shared';
import Menu from 'react-native-material-menu';
const FILTERS = TEXT_CONST.CURRENT_FRIENDS_FILTERS

const ScreenHOC = ({
    barStyle = 'dark-content',
    bottomSafeArea,
    children,
    containerStyle = {},
    headerContainerStyle,
    headerLeft,
    headerRight,
    headerTitle,
    onBackPress,
    safeAreaRequired = true,
    showBackIcon,
    showHeader = false,
    statusBarColor = 'white',
    statusBarRequired = true,
    titleStyle,
    showMenuIcon,
    onSelectDate,
    onRightPress,
    changeFilter,
    showFilter,
    rightText,
    backIcon
}) => {

    return (
        <View style={{ flex: 1, backgroundColor: 'white', borderColor: 'red', borderWidth: 0 }}>
            {!!safeAreaRequired && <SafeAreaView style={{ backgroundColor: COLORS.PRIMARY.DARK, }} />}
            { <StatusBar backgroundColor={COLORS.PRIMARY.DARK} animated barStyle={'light-content'} />}

            {!!showHeader && <CustomHeader
                container={headerContainerStyle}
                left={headerLeft}
                onBackPress={onBackPress}
                right={headerRight}
                showBackIcon={showBackIcon}
                title={headerTitle}
                titleStyle={titleStyle}
                showMenuIcon={showMenuIcon}
                onRightPress={onRightPress}
                changeFilter={changeFilter}
                showFilter={showFilter}
                onSelectDate={onSelectDate}
                rightText={rightText}
                backIcon={backIcon}
            />}
            {/* <View style={{ backgroundColor: COLORS.PRIMARY.PINK }}>
                <CalenderStrip onSelectDate={onSelectDate} />
            </View> */}
            <View style={{ flex: 1, ...containerStyle, borderWidth: 0 }}>
                {children}
            </View>
            {!!bottomSafeArea && <SafeAreaView style={{ backgroundColor: 'white', }} />}
        </View>)
};


export default ScreenHOC;
