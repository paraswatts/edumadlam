import React from 'react';
import { StyleSheet } from 'react-native';
import { _scaleText, COLORS, ICONS } from '../../../shared';
import { CustomTouchableIcon } from '../../atoms';

const CustomFloatButton = ({
    absolue = true,
    activeOpacity = 0.6,
    disabled,
    onPress = () => { },
    style,
}) => (
        <CustomTouchableIcon
            activeOpacity={activeOpacity}
            disabled={disabled}
            onPress={onPress}
            style={[styles.container(disabled), absolue && styles.absolue, style]}
        >
            {ICONS.NEXT(30)}
        </CustomTouchableIcon>
    );

export default CustomFloatButton;

const styles = StyleSheet.create({
    container: disabled => ({
        borderRadius: 100,
        padding: _scaleText(10).fontSize,
        backgroundColor: disabled ? COLORS.GREY._4 : COLORS.PRIMARY.PINK,
        alignSelf: 'flex-end',
    }),
    absolue: {
        position: 'absolute',
        bottom: _scaleText(16).fontSize,
        right: _scaleText(24).fontSize,
    }
});
