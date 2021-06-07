import { StyleSheet } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES } from '../../../shared';

export default StyleSheet.create({
    container: {
        paddingTop: _scaleText(24).fontSize,
    },
    scrollContainer: {
        paddingHorizontal: _scaleText(24).fontSize,
    },
    back: {
        marginHorizontal: _scaleText(24).fontSize,
        marginBottom: _scaleText(10).fontSize
    },
    title: {
        color: COLORS.PRIMARY.PINK,
        ...TEXT_STYLES.H2
    },
    subtitleContainer: (val = 8) => ({
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginTop: _scaleText(val).fontSize,
    }),
    subtitle: {
        color: COLORS.GREY._2,
        ...TEXT_STYLES.BODY2
    },
    change: {
        color: COLORS.SECONDARY.BLUE,
        ...TEXT_STYLES.H4,
    },
    codeNotReceived: {
        color: COLORS.GREY._2,
        marginTop: _scaleText(16).fontSize,
        ...TEXT_STYLES.BODY3
    },
    invalidCode: {
        color: COLORS.SECONDARY.YELLOW,
        marginTop: _scaleText(16).fontSize,
        ...TEXT_STYLES.SB2
    },
    resendCode: {
        color: COLORS.SECONDARY.BLUE,
        marginTop: _scaleText(4).fontSize,
        ...TEXT_STYLES.H5,
    },
    buttonStyle: {
        paddingHorizontal: _scaleText(50).fontSize,
        marginTop: _scaleText(20).fontSize,
        borderRadius: _scaleText(5).fontSize,
        backgroundColor: COLORS.PRIMARY.PINK,
        borderWidth: 0
    },
});