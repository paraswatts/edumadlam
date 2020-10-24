import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { _scaleText, COLORS, ICONS } from '../../../shared';
import { CustomTextInput } from '../../atoms';

const CustomRadioField = ({
    data = [],
    label,
    labelContainer,
    onChange,
    valKey = 'id',
    value,
}) => (
        <CustomTextInput
            label={label}
            labelContainer={labelContainer}
        >
            <View style={styles.container}>
                {data.map(item => {
                    let { id, label = '' } = item;
                    let selected = item[valKey] == value;
                    return (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            key={id + ''}
                            onPress={() => onChange(item)}
                            style={styles.itemContainer}
                        >
                            {selected ? ICONS.RADIO_BUTTON_SELECTED(18) : ICONS.RADIO_BUTTON_DEFAULT(18)}
                            <Text style={styles.label(selected)}>{label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

        </CustomTextInput>
    );

export default CustomRadioField;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemContainer: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        paddingTop: _scaleText(11).fontSize
    },
    label: selected => ({
        fontSize: _scaleText(16).fontSize,
        paddingHorizontal: _scaleText(5).fontSize,
        color: selected ? COLORS.GREY._1 : COLORS.GREY.MEDIUM
    })
});