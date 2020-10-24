import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { _scaleText, COLORS, ICONS } from '../../../shared';
import { CustomTextInput, CustomTouchableIcon } from '../../atoms';

const CustomSearchInput = ({
    active,
    maxLength = 20,
    onBlur,
    onChangeText,
    onFocus,
    placeholder,
    style,
    value = '',
}) => (
        <View style={[styles.container(active), style]}>
            {!active && ICONS.SEARCH(24)}
            <CustomTextInput
                containerStyle={styles.inputContainer}
                inputContainer={styles.input}
                onBlur={onBlur}
                onChangeText={onChangeText}
                onFocus={onFocus}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={COLORS.GREY.MEDIUM}
                returnKeyType='search'
                showError={false}
                style={styles.textInput}
                value={value}
            />
            {!!value.length && <CustomTouchableIcon
                onPress={() => onChangeText('')}
            >
                {ICONS.CLOSE(24)}
            </CustomTouchableIcon>}
        </View>
    );

export default CustomSearchInput;

const styles = StyleSheet.create({
    container: (active) => ({
        flexDirection: 'row',
        minHeight: _scaleText(42).fontSize,
        padding: _scaleText(8).fontSize,
        minHeight: _scaleText(42).fontSize,
        borderWidth: _scaleText(1).fontSize,
        borderColor: active ? COLORS.SECONDARY.GREEN : COLORS.GREY._4,
        borderRadius: _scaleText(50).fontSize,
        alignItems: 'center',
    }),
    inputContainer: {
        flex: 1,
        marginLeft: _scaleText(12).fontSize,
        paddingVertical: 0,
    },
    input: {
        borderBottomWidth: 0,
        paddingVertical: 0,
    },
    textInput: {

        textAlignVertical: 'center',
        ..._scaleText(16)
    }
});