import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { _scaleText, COLORS } from '../../../shared';

const CustomButton = ({
    children,
    container,
    disabled,
    label = '',
    labelSize = 14,
    labelStyle,
    left,
    onPress = () => { },
    right,
}) => {
    console.log("disabled", disabled)
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5, }}
            onPress={onPress}
            style={[styles.container, container]}
        >
            {!!left && left}
            {children}
            <Text style={[styles.label(labelSize), labelStyle]}>{label}</Text>
            {!!right && right}
        </TouchableOpacity>
    );
}

export default CustomButton;
const styles = StyleSheet.create({
    container: {
        borderWidth: _scaleText(1).fontSize,
        borderColor: COLORS.PRIMARY.PINK,
        paddingHorizontal: _scaleText(12).fontSize,
        paddingVertical: _scaleText(12).fontSize,
        borderRadius: _scaleText(100).fontSize,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: (labelSize) => ({
        color: COLORS.PRIMARY.PINK,

        fontSize: _scaleText(labelSize).fontSize,
    })
});