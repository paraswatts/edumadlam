import * as React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTES, navigationRef } from '../shared';
import { updateInternetStatus, streamRequest } from '../redux/actions';
import {
    BottomTabDashboard,
    SignInScreen,
    SignupScreen,
    SplashScreen,
    VerificationCodeScreen,
    WebViewScreen,
    DrawerNavigator,
    ImportantSubCategory,
    DetailsScreen,
    NewsSubCategory,
    NewsDetailsScreen
} from '../screens';
import NetInfo from "@react-native-community/netinfo";

const Stack = createStackNavigator();

function RootNavigator({
    updateInternetStatus,
    netConnected,
    streamRequest
}) {
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected, isInternetReachable }) => {
            updateInternetStatus(isConnected)
        });
        return unsubscribe
    })
    React.useEffect(() => {
        console.log("heredadas")
        let payload = {
            netConnected
        }
        streamRequest(payload)
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{ gestureEnabled: false }}
                headerMode='none'>
                <Stack.Screen name={ROUTES.SPLASH_SCREEN} component={SplashScreen} />
                <Stack.Screen name={ROUTES.SIGNIN_SCREEN} component={SignInScreen} />
                <Stack.Screen name={ROUTES.SIGNUP_SCREEN} component={SignupScreen} />
                <Stack.Screen name={ROUTES.VERIFICATION_CODE_SCREEN} component={VerificationCodeScreen} />
                <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} />
                <Stack.Screen name={ROUTES.WEB_VIEW_SCREEN} component={WebViewScreen} />
                <Stack.Screen name={ROUTES.IMPORTANT.SUB_CATEGORY} component={ImportantSubCategory} />
                <Stack.Screen name={ROUTES.IMPORTANT.DETAIL} component={DetailsScreen} />
                <Stack.Screen name={ROUTES.NEWS.SUB_CATEGORY} component={NewsSubCategory} />
                <Stack.Screen name={ROUTES.NEWS.DETAIL} component={NewsDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateInternetStatus: payload => dispatch(updateInternetStatus(payload)),
        streamRequest: (payload) => dispatch(streamRequest(payload))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
