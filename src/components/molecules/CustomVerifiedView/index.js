import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES, TEXT_CONST, BASE_URL } from '../../../shared';
import { CustomImage } from '../../atoms';

const CustomVerifiedView = ({
    data = [],
    textStyle,
    varifiedBy = 0,
}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {data.slice(0, 3).map((value, index) => {
                return (<CustomImage size={20} key={index} uri={BASE_URL + '/pp/' + value} container={styles.image(index)} />)
            })}
            <Text style={[styles.text(data.length), textStyle]}>{varifiedBy > 3 ? `+${varifiedBy - 3}` : varifiedBy} {TEXT_CONST.VERIFIED} </Text>
        </View>
    );
}
export default CustomVerifiedView;

const imageWidth = 20;

const styles = StyleSheet.create({
    image: index => ({
        borderRadius: _scaleText(501).fontSize,
        height: _scaleText(imageWidth).fontSize,
        left: index * _scaleText(12.5).fontSize,
        position: index == 0 ? 'relative' : 'absolute',
        width: _scaleText(imageWidth).fontSize,
    }),
    text: count => ({
        paddingLeft: ((count - 1) * _scaleText(12.5).fontSize) + _scaleText(8).fontSize,
        color: COLORS.SECONDARY.BLUE,
        ...TEXT_STYLES.SB1,
    })
});
