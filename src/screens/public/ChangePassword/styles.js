import { StyleSheet } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES } from '../../../shared';

export default StyleSheet.create({
    container: {
        paddingTop: _scaleText(24).fontSize
    },
    scrollContainer: {
        paddingHorizontal: _scaleText(24).fontSize,
    },
    back: {
        marginHorizontal: _scaleText(24).fontSize,
        marginBottom: _scaleText(10).fontSize
    },
    signup: {
        color: COLORS.PRIMARY.PINK,
        ...TEXT_STYLES.H2
    },
    fillCredentials: {
        marginTop: _scaleText(8).fontSize,
        color: COLORS.GREY._2,
        ...TEXT_STYLES.BODY2
    },
    mobInput: {
        marginTop: _scaleText(50).fontSize,
    },
    privacyPolicy: {
        color: COLORS.GREY._1,
        marginTop: _scaleText(24).fontSize,
        textAlign: 'center',
        ...TEXT_STYLES.BODY4,
    },
    termsHyperlink: {
        color: COLORS.SECONDARY.BLUE
    },
    alreadyMember: {
        marginVertical: _scaleText(24).fontSize,
        color: COLORS.GREY._2,
        textAlign: 'center',
        ...TEXT_STYLES.BODY2
    },
    emailAlreadyRegisteredContainer: {
        borderWidth: 1,
        borderColor: COLORS.GREY.LIGHT,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: _scaleText(12).fontSize,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        marginTop: _scaleText(12).fontSize
    },
    emailRegisteredText: {
        flex: 1,
        color: COLORS.GREY._2,
        ...TEXT_STYLES.BODY3,
        marginRight: _scaleText(12).fontSize
    },
    update: {
        color: COLORS.SECONDARY.BLUE,
        ...TEXT_STYLES.H5,
    },
    buttonStyle: {
        paddingHorizontal: _scaleText(50).fontSize,
        marginTop: _scaleText(5).fontSize,
        borderRadius: _scaleText(5).fontSize,
        backgroundColor: COLORS.PRIMARY.PINK,
        borderWidth: 0
    },
    form: { marginTop: _scaleText(100).fontSize }
});