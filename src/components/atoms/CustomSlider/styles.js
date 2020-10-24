import { StyleSheet } from 'react-native';
import { COLORS, _scaleText } from '../../../shared';

export default StyleSheet.create({
    sliderCont: {
        margin: _scaleText(16).fontSize
    },
    miles: active => ({
        ..._scaleText(14),
        color: active ? COLORS.PRIMARY.PINK : COLORS.GREY.MEDIUM,

    }),
    tip: {
        width: 0,
        height: 0,
        borderLeftWidth: _scaleText(4).fontSize,
        borderRightWidth: _scaleText(4).fontSize,
        borderBottomWidth: _scaleText(10).fontSize,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: COLORS.SECONDARY.YELLOW,
    },
});