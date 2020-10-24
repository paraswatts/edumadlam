import React from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import { CustomHeader, CalenderStrip } from '../../';
import { COLORS } from '../../../shared';
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
    onSelectDate = () => { },
    onRightPress
}) => (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {!!safeAreaRequired && <SafeAreaView style={{ backgroundColor: statusBarColor, }} />}
            {!!statusBarRequired && <StatusBar backgroundColor={statusBarColor} animated barStyle={barStyle} />}

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
            />}
            {/* <View style={{ backgroundColor: COLORS.PRIMARY.PINK }}>
                <CalenderStrip onSelectDate={onSelectDate} />
            </View> */}
            <View style={{ flex: 1, ...containerStyle }}>
                {children}
            </View>
            {!!bottomSafeArea && <SafeAreaView style={{ backgroundColor: 'white', }} />}
        </View>
    );

export default ScreenHOC;
