import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, _scaleText, TEXT_STYLES } from '../../../../../shared';
import { isTablet } from 'react-native-device-info';

export default StyleSheet.create({
    listView: {
        paddingBottom: _scaleText(30).fontSize + _scaleText(isTablet() ? 70 : 54).fontSize
    },
    container: {
        backgroundColor: COLORS.GREY.LIGHTER,
        paddingTop: _scaleText(8).fontSize,
    },
    buttonContainer: {
        padding: _scaleText(16).fontSize,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: _scaleText(16).fontSize,
        marginVertical: _scaleText(8).fontSize,
        borderWidth: _scaleText(1).fontSize,
        borderRadius: _scaleText(5).fontSize,
        borderColor: COLORS.GREY.LIGHT
    },
    buttonTitle: {
        paddingHorizontal: _scaleText(12).fontSize,
        flex: 1,

        fontSize: _scaleText(16).fontSize,
    },
    iconStyle: (size = 24) => ({
        width: _scaleText(size).fontSize,
        height: _scaleText(size).fontSize
    }),
    customButtonStyle: {
        marginHorizontal: 0,
        marginBottom: 0,
        borderRadius: 0,
    },
    customButtonTitle: {

    },
    viewAllContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewAll: {
        color: COLORS.SECONDARY.BLUE,

        fontSize: _scaleText(16).fontSize
    },
    friendsContainer: outerHeight => ({
        backgroundColor: 'white',
        height: outerHeight,
        marginTop: _scaleText(8).fontSize,
        paddingTop: _scaleText(18).fontSize,
    }),
    friendsCont: {
        flexDirection: 'row',
        paddingHorizontal: _scaleText(16).fontSize
    },
    currentFriends: {

        fontSize: _scaleText(16).fontSize,
        color: COLORS.GREY._1,
        flex: 1
    },
    noCurrentFriend: {
        justifyContent: 'center',
        padding: _scaleText(53).fontSize,
        alignItems: 'center'
    },
    noFriends: {
        marginTop: _scaleText(16).fontSize,
        color: COLORS.GREY._1,
        ...TEXT_STYLES.H3
    },
    noFriendsBottom: {
        marginTop: _scaleText(8).fontSize,
        marginBottom: _scaleText(16).fontSize,
        color: COLORS.GREY._2,
        textAlign: 'center',
        ...TEXT_STYLES.BODY3
    },
    invite: {
        fontSize: _scaleText(14).fontSize,
        marginVertical: _scaleText(2).fontSize
    },
    menuContainer: {
        paddingHorizontal: _scaleText(16).fontSize,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: _scaleText(18).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        width: _scaleText(120).fontSize
    },
    menuLabel: selected => ({
        color: selected ? COLORS.GREY._1 : COLORS.GREY._2,

        marginLeft: _scaleText(8).fontSize,
        fontSize: _scaleText(14).fontSize,
    }),
    userContainer: {
        marginBottom: 0,
        paddingHorizontal: 0,
        marginHorizontal: _scaleText(16).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        paddingVertical: _scaleText(16).fontSize,
        borderColor: COLORS.GREY.LIGHT,
    },
    toastContainer: {
        backgroundColor: COLORS.GREY._1,
        padding: _scaleText(16).fontSize,
        borderRadius: _scaleText(5).fontSize,
        margin: _scaleText(16).fontSize
    },
    toastTitle: {
        ...TEXT_STYLES.SB1,
        color: 'white',
        flex: 1
    },
    toastSubTitleContainer: {
        flexDirection: 'row',
        marginTop: _scaleText(16).fontSize,
        justifyContent: 'flex-end'
        // alignItems: 'flex-end'
    },
    toastSubTitle: {
        ...TEXT_STYLES.BODY3,
        color: 'white',
        flex: 1
    },
    toastButton: {
        backgroundColor: 'white',
        // flex: 1,
    },
    search: {
        margin: _scaleText(16).fontSize
    },

    parent: {
        height: '80%',
        width: '100%',
        transform: [{ scaleX: 2 }],
        borderBottomStartRadius: 200,
        borderBottomEndRadius: 200,
        overflow: 'hidden',
    },
    child: {
        flex: 1,
        transform: [{ scaleX: 0.5 }],

        backgroundColor: COLORS.PRIMARY.PINK,
        justifyContent: 'center'
    }

});