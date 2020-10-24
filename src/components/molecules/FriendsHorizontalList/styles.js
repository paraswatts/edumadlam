import { StyleSheet } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES } from '../../../shared';

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    listContainer: {
        paddingHorizontal: _scaleText(8).fontSize,
    },
    itemContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: COLORS.GREY.LIGHT,
        borderRadius: _scaleText(5).fontSize,
        borderWidth: _scaleText(1).fontSize,
        marginHorizontal: _scaleText(8).fontSize,
        marginVertical: _scaleText(16).fontSize,
        paddingVertical: _scaleText(16).fontSize,
        // paddingHorizontal: _scaleText(12).fontSize,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: _scaleText(144).fontSize,
    },
    image: {
        width: _scaleText(48).fontSize,
        borderRadius: _scaleText(40).fontSize,
        height: _scaleText(48).fontSize,
    },
    name: {
        color: COLORS.GREY._1,
        ...TEXT_STYLES.SB1,
        marginTop: _scaleText(6).fontSize,
    },
    mutual: {
        color: COLORS.SECONDARY.BLUE,
        ...TEXT_STYLES.SB2,
        textAlign: 'center',
        marginTop: _scaleText(4).fontSize,
        marginBottom: _scaleText(12).fontSize,
    },
    iconContainer: {
        position: 'absolute',
        right: _scaleText(12).fontSize,
        top: _scaleText(12).fontSize,
    },
    buttonLabel: {
        color: COLORS.SECONDARY.GREEN
    },
    button: {
        borderWidth: 0,
        // paddingVertical: _scaleText(0).fontSize
    },
    viewAll: {
        color: COLORS.PRIMARY.PINK,

        fontSize: _scaleText(16).fontSize
    }
});