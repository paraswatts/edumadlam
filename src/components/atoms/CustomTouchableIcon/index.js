import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const CustomTouchableIcon = ({
    activeOpacity = 0.6,
    children,
    disabled,
    onPress = () => { },
    style,
}) => (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            disabled={disabled}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5, }}
            onPress={onPress}
            style={style}
        >
            {children}
        </TouchableOpacity>
    );

export default CustomTouchableIcon;
