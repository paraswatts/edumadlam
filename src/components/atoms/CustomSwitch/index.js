import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { _scaleText, ICONS } from '../../../shared';

const iconStyle = (size = 30) => ({
    width: _scaleText(size).fontSize,
    height: _scaleText(size).fontSize,
})

const CustomSwitch = ({
    activeIcon = ICONS.AVAILABLE(30),
    container,
    disabled,
    inactiveIcon = ICONS.UN_AVAILABLE(30),
    onChageValue = () => { },
    value,
}) => (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={!!disabled}
            onLongPress={() => onChageValue(!value)}
            onPress={() => onChageValue(!value)}
            style={[styles.container(!!value), container]}
        >
            <View style={styles.item(!!value)}>
                {value ? activeIcon : inactiveIcon}
            </View>
        </TouchableOpacity>
    );

export default CustomSwitch;

const styles = StyleSheet.create({
    container: value => ({
        backgroundColor: '#f7f9ff',
        borderRadius: _scaleText(28).fontSize,
        height: _scaleText(28).fontSize,
        justifyContent: 'center',
        width: _scaleText(56).fontSize,
    }),
    item: (value) => ({
        ...(value ? { right: _scaleText(3).fontSize } : { left: _scaleText(3).fontSize }),
        ...iconStyle(25),
        alignItems: 'center',
        backgroundColor: value ? '#f7f9ff' : 'transparent',
        borderRadius: 100,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
    })
});