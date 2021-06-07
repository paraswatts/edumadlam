import React from 'react';
import { Text, UIManager, View, ScrollView, Keyboard } from 'react-native';
import { ScreenHOC, CustomTextInput, CustomButton } from '../../../../../components';
import { COLORS, _scaleText, validator, TEXT_CONST, _showCustomToast } from '../../../../../shared';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { Field, reduxForm } from 'redux-form';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    userData,
    handleSubmit,
    updateUserRequest,
    getUserDetailsRequest,
    netConnected,
    resetForm,
    sId
}) => {
    const { _name, _email } = userData
    console.log("userData", userData)
    const _onUserUpdate = (formProps) => {
        Keyboard.dismiss();
        updateUserRequest({
            netConnected,
            payload: { name: formProps.name, email: formProps.email.toLowerCase().trim(), mobile: formProps.mobile, sId: sId },
            success: () => {
                getUserDetails();
                _showCustomToast({ message: TEXT_CONST.UPDATE_SUCESS, type: 'success' })
            },
            fail: (message) => _showCustomToast({ message, type: 'error' })
        })

    }

    const getUserDetails = () => {
        getUserDetailsRequest({
            netConnected,
            payload: { sId: sId },
            success: () => {

            },
            fail: (message) => _showCustomToast({ message, type: 'error' })
        })
    }
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'My Profile'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <View style={styles.parent}>

                <View style={styles.child}>
                    <FastImage
                        style={{ height: _scaleText(80).fontSize, width: _scaleText(80).fontSize, borderRadius: _scaleText(40).fontSize }}
                        resizeMode={'contain'}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_pgXmULPlkKJ2_x26ijFGrw8GtinmhzSU8g&usqp=CAU' }}
                    />

                    <View
                        style={{ width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'space-around', marginTop: _scaleText(20).fontSize }}
                    >
                        <View style={{ padding: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: _scaleText(14).fontSize }}>Name</Text>
                            <Text style={{ color: 'white', textTransform: 'capitalize', fontSize: _scaleText(12).fontSize }}>{_name}</Text>
                        </View>
                        <View style={{ padding: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: _scaleText(14).fontSize }}>Email</Text>
                            <Text style={{ color: 'white', fontSize: _scaleText(12).fontSize }}>{_email}</Text>
                        </View>
                    </View>

                </View>
            </View>
            <ScrollView style={styles.scrollContainer}>

                <View style={{ marginTop: _scaleText(24).fontSize }}>
                    <Field
                        name={TEXT_CONST.NAME_INPUT_NAME}
                        props={{
                            placeholder: 'Name'
                        }}
                        component={CustomTextInput}
                    />
                    <Field
                        name={TEXT_CONST.EMAIL_INPUT_NAME}
                        props={{
                            placeholder: 'Email Address'
                        }}
                        keyboardType='email-address'
                        component={CustomTextInput}
                    />
                    <Field
                        name={TEXT_CONST.MOBILE_INPUT_NAME}
                        props={{
                            placeholder: 'Mobile Number'
                        }}
                        keyboardType='phone-pad'
                        component={CustomTextInput}
                    />
                    {/* <Field
                        name={TEXT_CONST.PASSWORD_INPUT_NAME}
                        props={{
                            placeholder: 'Password'
                        }}
                        secureTextEntry
                        component={CustomTextInput}
                    /> */}
                    <CustomButton
                        label={TEXT_CONST.UPDATE}
                        labelStyle={{ color: 'white' }}
                        onPress={handleSubmit(_onUserUpdate)}
                        container={styles.buttonStyle}
                    />
                </View>
            </ScrollView>
        </ScreenHOC>
    );
}

const reduxFormFunction = reduxForm({
    form: 'updateProfile',
    fields: ['email', 'password', 'mobile', 'name'],
    validate: validator,
    enableReinitialize: true,
})(FriendsScreen);
export default reduxFormFunction