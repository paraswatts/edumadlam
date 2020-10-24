import { StyleSheet } from 'react-native';
import { _scaleText, COLORS } from '../../../shared';
let { GREEN, RED, YELLOW } = COLORS.SECONDARY;
export default StyleSheet.create({
    container: (type, floating, hasNotch) => ({
        alignItems: 'center',
        backgroundColor: type == 'success' ? GREEN : type == 'error' ? RED : type == 'warn' ? YELLOW : COLORS.GREY._1,
        borderRadius: _scaleText(5).fontSize,
        flexDirection: 'row',
        marginBottom: _scaleText(hasNotch ? 32 : floating ? 12 : 0).fontSize,
        marginHorizontal: _scaleText(floating ? 12 : 0).fontSize,
        marginTop: 0,
        padding: _scaleText(12).fontSize,
    }),
    textContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: _scaleText(12).fontSize
    },
    title: {
        color: 'white',

        fontSize: _scaleText(14).fontSize
    }
});