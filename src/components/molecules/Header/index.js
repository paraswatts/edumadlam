import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES, ICONS } from '../../../shared';
import { CustomTouchableIcon } from '../../atoms';


const CustomHeader = ({
    container,
    left,
    onBackPress = () => { },
    right,
    showBackIcon,
    title,
    titleStyle,
    showMenuIcon,
    onRightPress = () => { },
}) => (
        <View style={[styles.container, container]}>
            {showBackIcon && <CustomTouchableIcon
                onPress={onBackPress}
                style={styles.icon}
            >
                {ICONS.BACK(24)}
            </CustomTouchableIcon>}
            {showMenuIcon && <CustomTouchableIcon
                onPress={onBackPress}
                style={styles.icon}
            >
                {ICONS.MENU(20)}
            </CustomTouchableIcon>}
            {!!left && left}
            <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>
            <CustomTouchableIcon
                onPress={onRightPress}
                style={styles.icon}
            >
                {!!right && right}
            </CustomTouchableIcon>
        </View>
    );

export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _scaleText(16).fontSize,
        paddingVertical: _scaleText(16).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT
    },
    icon: {
        marginRight: _scaleText(8).fontSize,
        borderWidth: 0
    },
    title: {
        paddingLeft: -(_scaleText(20).fontSize),
        borderWidth: 0,
        textAlign: 'center',
        fontSize: _scaleText(18).fontSize,
        lineHeight: _scaleText(27).fontSize,
        color: COLORS.GREY._1,
        flex: 1
    }
});