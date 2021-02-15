import React from 'react';
import { Text, StyleSheet, TextInput, View, Platform } from 'react-native';
import { TEXT_STYLES, _scaleText, COLORS, ICONS } from '../../../shared';

const CustomTextInput = ({
    active,
    autoCapitalize = 'words',
    autoCorrect = false,
    children,
    containerStyle,
    customBottom,
    customIcon,
    errorMessage = '',
    inputContainer,
    keyboardType,
    label,
    labelContainer,
    labelRight,
    labelRightStyle,
    labelRightView,
    labelStyle,
    onChangeText,
    input,
    placeholder = '',
    refs,
    returnKeyType = 'done',
    showError = true,
    style = {},
    subLabel,
    subLabelStyle,
    subText = '',
    value = '',
    secureTextEntry,
    meta: { touched, error, visited },
    ...props
}) => {
    const validationMessage =
        touched && error ? error : '';
    return (
        <View style={[styles.container, containerStyle]}>
            {/* {!!label && <View style={[styles.labelContainer, labelContainer]}>
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                {!!labelRight && <Text style={[styles.subLabel, { paddingVertical: 0 }, labelRightStyle]}>{labelRight}</Text>}
                {!!labelRightView && <View style={labelRightStyle}>{labelRightView}</View>}
            </View>} */}
            {/* {!!subLabel && <Text style={[styles.subLabel, subLabelStyle]}>{subLabel}</Text>} */}
            {!!placeholder && <View style={[styles.inputContainer(touched ? true : false), inputContainer]}>
                <TextInput
                    placeholderTextColor={COLORS.GREY._4}
                    {...props}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    ref={refs}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={returnKeyType}
                    style={[styles.input(!!value.length), style]}
                    {...input}
                // value={value}
                />
                {customIcon ? customIcon : !!validationMessage && ICONS.ERROR(20)}
            </View>}
            {/* {children}
            {customBottom && customBottom} */}
            {/* {!!validationMessage && <Text style={styles.subText}>{subText}</Text>} */}
            {!!validationMessage && <Text style={styles.error(error)}>{validationMessage}</Text>}
        </View>
    )
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        paddingVertical: _scaleText(8).fontSize,
        borderWidth: 0,
    },
    label: {
        ...TEXT_STYLES.SB1,
        flex: 1,
        color: COLORS.GREY._2
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subLabel: {
        color: COLORS.GREY.MEDIUM,
        ...TEXT_STYLES.BODY3,
        paddingVertical: _scaleText(8).fontSize,
    },
    inputContainer: active => ({
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? _scaleText(9).fontSize : 0,
        paddingHorizontal: _scaleText(9).fontSize,
        borderColor: COLORS.GREY._4,
        borderWidth: 1,
        // paddingHorizontal: 0,
        borderRadius: 5
    }),
    subText: {
        color: COLORS.GREY._2,
        paddingTop: _scaleText(8).fontSize,
        ...TEXT_STYLES.BODY3,
    },
    input: length => ({
        flex: 1,
        // padding: 0,
        fontSize: _scaleText(18).fontSize,
    }),
    error: error => ({
        ...TEXT_STYLES.SB2,
        paddingTop: _scaleText(8).fontSize,
        color: error ? COLORS.SECONDARY.YELLOW : 'white'
    })
});