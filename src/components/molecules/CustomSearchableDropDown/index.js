import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { CustomTextInput, CustomTouchableIcon } from '../../atoms';
import { _scaleText, COLORS, TEXT_STYLES, ICONS } from '../../../shared';

const CustomDropDown = ({
    active,
    addressFullScreen,
    data = [],
    dropDownStyle,
    label,
    labelStyle,
    onBlur = () => { },
    onChangeText = () => { },
    onFieldPress,
    onFocus = () => { },
    onPressAddress = () => { },
    onPressIcon = () => { },
    onSubmitEditing = () => { },
    placeholder,
    returnKeyType,
    showIcon,
    style,
    subLabel,
    touchStyle,
    valKey = 'name',
    value = '',
    ...props
}) => {
    const [height, updateHeight] = useState(Dimensions.get('window').height);
    useEffect(() => {
        Dimensions.addEventListener("change", ({ window: { height } }) => updateHeight(height));
        return () => {
            Dimensions.removeEventListener("change", () => { });
        };
    });
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={touchStyle}
            disabled={!onFieldPress}
            onPress={onFieldPress}
        >
            <CustomTextInput
                active={active}
                label={label}
                labelStyle={labelStyle}
                onBlur={onBlur}
                style={style}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                returnKeyType={returnKeyType}
                subLabel={subLabel}
                value={value}
                customIcon={showIcon && <CustomTouchableIcon
                    onPress={onPressIcon}
                >
                    {addressFullScreen ? ICONS.DROPDOWN_COLLAPSE(18) : ICONS.DROPDOWN_EXPAND(18)}
                </CustomTouchableIcon>}
                {...props}
            >
                {!!(addressFullScreen && data.length) && <View style={[styles.shadow, dropDownStyle]}>
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                        nestedScrollEnabled
                        style={styles.itemsContainer(height)}
                    >
                        {data.map((item, index) => {
                            return (<TouchableOpacity
                                activeOpacity={0.6}
                                key={index}
                                onPress={() => onPressAddress(item)}
                                style={styles.itemContainer}
                            >
                                <Text style={styles.label}>{item[valKey]}</Text>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                </View>}
            </CustomTextInput>
        </TouchableOpacity>
    );
}
export default CustomDropDown;

const styles = StyleSheet.create({
    itemsContainer: height => ({
        borderWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        paddingHorizontal: _scaleText(16).fontSize,
        backgroundColor: 'white',
        maxHeight: height * 0.4,
        borderRadius: _scaleText(5).fontSize
    }),
    itemContainer: {
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    label: {
        paddingVertical: _scaleText(16).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        color: COLORS.GREY._2,
        ...TEXT_STYLES.SB2
    }
});