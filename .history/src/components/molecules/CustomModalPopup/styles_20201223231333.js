import { StyleSheet } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES } from '../../../shared';

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(21,48,89,0.7)',
        flex: 1,
        justifyContent: 'center'
    },
    userCont: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'center',
        paddingVertical: _scaleText(12).fontSize,
        marginBottom: _scaleText(12).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        borderBottomWidth: _scaleText(1).fontSize
    },
    nameCont: {
        paddingHorizontal: _scaleText(12).fontSize,
        justifyContent: 'center'
    },
    name: {
        ...TEXT_STYLES.SB1,
        color: COLORS.GREY._
    },
    verify: {
        ...TEXT_STYLES.SB1,
        color: COLORS.GREY._3
    },
    address: {
        ...TEXT_STYLES.BODY3,
        marginLeft: _scaleText(4).fontSize,
        textAlign: 'center',
        flex: 1,
        color: COLORS.GREY._3
    },
    close: {
        alignSelf: 'flex-end'
        position: 'absolute',
        // top: _scaleText(16).fontSize,
        // right: _scaleText(16).fontSize
    },
    dataContainer: {
        padding: _scaleText(16).fontSize,
        borderRadius: _scaleText(5).fontSize,
        backgroundColor: 'white',
        margin: _scaleText(30).fontSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        flexDirection: 'column'
    },
    title: {
        color: COLORS.PRIMARY.PINK,
        ...TEXT_STYLES.H2,
        marginTop: _scaleText(24).fontSize,
        textAlign: 'center'
    },
    subTitle: {
        color: COLORS.GREY._1,
        padding: _scaleText(8).fontSize,
        ...TEXT_STYLES.BODY2,
        textAlign: 'center'
    },
    button: {
        height: _scaleText(40).fontSize,
        marginTop: _scaleText(16).fontSize,
        backgroundColor: COLORS.PRIMARY.YELLOW,
        padding: _scaleText(8).fontSize,
        borderColor: COLORS.PRIMARY.YELLOW
    },
    buttonLabel: {
        color: 'white',
        // paddingVertical: _scaleText(8).fontSize,

        fontSize: _scaleText(14).fontSize
    }
});