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
    NewsDetailsScreen,
    TestSeriesScreen,
    TestSeriesListScreen,
    PurchasedTestSeriesListScreen,
    YoutubePlayer,
    TestQuestions,
    PurchasedTestList,
    QuizScreen,
    YoutubeVideos,
    TestDetailScreen,
    PaymentWebView,
    YoutubeVideoCategories,
    ImportantPostList,
    ForgetPasswordScreen,
    ImportantChapterScreen,
    ChangePasswordScreen,
    ImportantPurchasedChapterScreen
} from '../screens';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

const Stack = createStackNavigator();

function RootNavigator({
    updateInternetStatus,
    netConnected,
    streamRequest
}) {
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({ isConnected, isInternetReachable }) => {
            console.log(isConnected, "herere", isInternetReachable)
            // Alert.alert(isConnected + "isConnected" + isInternetReachable)
            updateInternetStatus(isConnected)
        });
        return unsubscribe
    })
    React.useEffect(() => {
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
                <Stack.Screen name={ROUTES.FORGET_PASSWORD} component={ForgetPasswordScreen} />
                <Stack.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePasswordScreen} />
                <Stack.Screen name={ROUTES.SIGNUP_SCREEN} component={SignupScreen} />
                <Stack.Screen name={ROUTES.VERIFICATION_CODE_SCREEN} component={VerificationCodeScreen} />
                <Stack.Screen name={ROUTES.HOME} component={DrawerNavigator} />
                <Stack.Screen name={ROUTES.WEB_VIEW_SCREEN} component={WebViewScreen} />
                <Stack.Screen name={ROUTES.IMPORTANT.SUB_CATEGORY} component={ImportantSubCategory} />
                <Stack.Screen name={ROUTES.IMPORTANT.DETAIL} component={DetailsScreen} />
                <Stack.Screen name={ROUTES.IMPORTANT.POST_LIST} component={ImportantPostList} />
                <Stack.Screen name={ROUTES.IMPORTANT.CHAPTER_LIST} component={ImportantChapterScreen} />
                <Stack.Screen name={ROUTES.IMPORTANT.PURCHASED_CHAPTER_LIST} component={ImportantPurchasedChapterScreen} />
                <Stack.Screen name={ROUTES.NEWS.SUB_CATEGORY} component={NewsSubCategory} />
                <Stack.Screen name={ROUTES.NEWS.DETAIL} component={NewsDetailsScreen} />
                <Stack.Screen name={ROUTES.TEST.CATEGORY} component={TestSeriesScreen} />
                <Stack.Screen name={ROUTES.TEST.LIST} component={TestSeriesListScreen} />
                <Stack.Screen name={ROUTES.TEST.PURCHASED_SERIES} component={PurchasedTestSeriesListScreen} />
                <Stack.Screen name={ROUTES.VIDEO.SINGLE_VIDEO} component={YoutubePlayer} />
                <Stack.Screen name={ROUTES.TEST.QUESTIONS} component={TestQuestions} />
                <Stack.Screen name={ROUTES.TEST.PURCHASED_TESTS} component={PurchasedTestList} />
                <Stack.Screen name={ROUTES.DAILY_MCQ.QUIZ_SCREEN} component={QuizScreen} />
                <Stack.Screen name={ROUTES.VIDEO.YOUTUBE_VIDEOS} component={YoutubeVideos} />
                <Stack.Screen name={ROUTES.VIDEO.YOUTUBE_CATEGORIES} component={YoutubeVideoCategories} />
                <Stack.Screen name={ROUTES.TEST.TEST_DETAIL} component={TestDetailScreen} />
                <Stack.Screen name={ROUTES.TEST.PAYMENT_SCREEN} component={PaymentWebView} />
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
