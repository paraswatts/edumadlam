import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { _scaleText, COLORS, ICONS, } from '../../../shared';

const CustomOtpBox = ({
    error,
    n,
    onChangeText = () => { },
    value = [],
}) => {
    let inputsRefs = [];
    const [active, toggleActive] = useState(-1)
    const onChange = (val, index) => {
        if (val.length > 1) {
            val = val.replace(/[^0-9]/ig, "");
            if (val.length) {
                let otp = value;
                let lastIndex = index;
                val.split("").forEach((item, ind) => {
                    (index + ind) < n && (otp[index + ind] = item, lastIndex = index + ind)
                })
                inputsRefs[lastIndex + (lastIndex < n - 1 ? 1 : 0)].focus();
                onChangeText([...otp])
            }
        } else if (/^\d+$/.test(val) || !val) {
            if (val && index + 1 < n) {
                inputsRefs[index + 1].focus();
            }
            let otp = value;
            otp[index] = val
            onChangeText([...otp])
        }
    }

    const onKeyPress = (e, index) => {
        if (e.nativeEvent.key == 'Backspace') {
            if (value[index]) {
                onChange('', index);
            } else {
                if (index) {
                    inputsRefs[index - 1].focus();
                    onChange('', index - 1)
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            {(new Array(n).fill(1, 0, n)).map((item, index) => {
                return (<TextInput
                    autoCapitalize='characters'
                    key={index}
                    keyboardType='number-pad'
                    maxLength={(value[index] || '').length ? 1 : null}
                    onBlur={() => toggleActive(-1)}
                    onChangeText={(val) => onChange(val, index)}
                    onFocus={() => toggleActive(index)}
                    onKeyPress={e => onKeyPress(e, index)}
                    ref={(ref) => (inputsRefs[index] = ref)}
                    style={styles.input(!!(value[index] || '') || active == index)}
                    value={value[index] || ''}
                />)
            })}
            <View style={styles.icon}>
                {!!error && ICONS.ERROR(20)}
            </View>
        </View>
    );
}

export default CustomOtpBox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: _scaleText(16).fontSize
    },
    input: (active) => ({
        borderWidth: _scaleText(1).fontSize,
        height: _scaleText(40).fontSize,
        width: _scaleText(40).fontSize,
        textAlign: 'center',
        padding: 0,
        fontSize: _scaleText(18).fontSize,

        borderRadius: _scaleText(3).fontSize,
        marginRight: _scaleText(8).fontSize,
        borderColor: active ? COLORS.SECONDARY.GREEN : '#c7c7c7'
    }),
    icon: {
        height: _scaleText(40).fontSize,
        width: _scaleText(35).fontSize,
        justifyContent: 'center',
        alignItems: 'center',
    }
});