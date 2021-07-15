import { takeLatest, all, put } from 'redux-saga/effects';
import { GET_USER_DETAILS_REQUEST, SIGNIN_REQUEST, reset, startLoading, stopLoading, LOGOUT_REQUEST, updateAuthTokenRedux, updateProfileSuccess, logoutRequest, SIGNUP_REQUEST, REQUEST_OTP, PHONE_UPDATE_OTP_REQUEST, PHONE_UPDATE_REQUEST, GET_USER_ONB_STEPS, getUserONBStepsRequest, getUserDetailsRequest, FORGET_PASSWORD_REQUEST, UPDATE_USER_REQUEST, OTP_VERIFY_REQUEST, LOGIN_VERIY_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, updateAuthToken, getRequest } from "../../shared/services/axios"
import { navigate, replace, popToTop, TEXT_CONST, ROUTES, _showCustomToast } from "../../shared"
import { store } from '../store';

function* signinSaga({ payload: { netConnected, payload = {}, success = (id) => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {} } = yield postRequest({
                API: API.SIGNIN(`?email=${payload.email}&password=${payload.password}&imei=${payload.imei}`)
            })
            console.log("hererre sign in", data)
            if (data && data.length && data[0].remark == 1) {
                success();
            } else {
                fail(data[0].msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("error", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* signupSaga({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { status, data = {} } = yield postRequest({
                API: API.SIGNUP(`?email=${payload.email}&password=${payload.password}&mobile=${payload.mobile}&name=${payload.name}&imei=${payload.imei}`)
            })
            console.log(payload, "data", data)
            if (status == 200) {
                if (data[0].remark == 1) {
                    success();
                } else {
                    fail(data[0].msg);

                }
            } else {
                fail(data[0].msg)
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {

        console.log('error', error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}



function* logoutSaga({ payload: { verify } = {} }) {
    try {
        console.log("verify", verify)
        yield put(startLoading());
        yield put(reset());
        updateAuthToken('');
        if (!verify) {
            _showCustomToast({ message: TEXT_CONST.LOGOUT_SUCCESS, type: 'success' })
        }

        // replace(ROUTES.SIGNIN_SCREEN);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield put(stopLoading());
    }
}


function* forgetPasswordSaga({ payload: { netConnected, payload = {}, success = (id) => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log("forgetPasswordSaga")
            yield put(startLoading());
            console.log("API.FORGET_PASSWORD(`?email=${payload.email}`", API.FORGET_PASSWORD(`?email=${payload.email}&type=${payload.type}`))
            const { data = {} } = yield postRequest({
                API: API.FORGET_PASSWORD(`?email=${payload.email}&type=${payload.type}`)
            })
            console.log(data && data.length && data[0]._status == 1, "data forgetPasswordSaga", data)
            if (data && data.length && data[0]._status == 1) {
                success();
            } else {
                fail(data[0]._error);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("forgetPasswordSaga error", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* updateUserSaga({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("payload", payload)
        if (netConnected) {
            yield put(startLoading());
            let api_url;
            if (payload.password) {
                api_url = API.UPDATE_USER(`?password=${payload.password}&sId=${payload.sId}`)
            } else {
                api_url = API.UPDATE_USER(`?email=${payload.email}&mobile=${payload.mobile}&name=${payload.name}&sId=${payload.sId}`)
            }
            const { _status, data = {} } = yield postRequest({
                API: api_url
            })
            console.log(payload, "data", data)
            if (data && data.length && data[0]._status == "1") {
                success();
            } else {
                fail(data[0]._msg)
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {

        console.log('error', error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}


function* otpVerifyRequest({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("payload", payload)
        if (netConnected) {
            yield put(startLoading());
            const { _status, data = {} } = yield postRequest({
                API: API.OTP_VERIFY(`?email=${payload.email}&otp=${payload.otp}`)
            })
            if (data && data.length && data[0]._status == "1") {
                yield put(updateAuthTokenRedux(data[0]._sId));
                success(data[0]._sId);
            } else {
                fail(data[0]._msg)
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {

        console.log('error', error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* loginVerifySaga({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {} } = yield postRequest({
                API: API.LOGIN_VERIFY(`?sId=${payload.sId}&imei=${payload.imei}`)
            })
            if (data && data.length && data[0]._status == 1) {
                success();
            } else {
                console.log("loginVerify", data[0])
                fail(data[0].msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("================fail login verify")
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(FORGET_PASSWORD_REQUEST, forgetPasswordSaga),
        takeLatest(SIGNIN_REQUEST, signinSaga),
        takeLatest(SIGNUP_REQUEST, signupSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
        takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
        takeLatest(OTP_VERIFY_REQUEST, otpVerifyRequest),
        takeLatest(LOGIN_VERIY_REQUEST, loginVerifySaga)
    ]);
}

export default AuthSaga;