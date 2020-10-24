import { takeLatest, all, put } from 'redux-saga/effects';
import { SIGNIN_REQUEST, reset, startLoading, stopLoading, LOGOUT_REQUEST, updateAuthTokenRedux, updateProfileSuccess, logoutRequest, SIGNUP_REQUEST, REQUEST_OTP, PHONE_UPDATE_OTP_REQUEST, PHONE_UPDATE_REQUEST, GET_USER_ONB_STEPS, getUserONBStepsRequest, getUserDetailsRequest } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, updateAuthToken, getRequest } from "../../shared/services/axios"
import { navigate, replace, popToTop, TEXT_CONST, ROUTES } from "../../shared"
import { store } from '../store';

function* signinSaga({ payload: { netConnected, payload = {}, alreadyRegistered = () => { }, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log(API.SIGNIN(`?email=${payload.email}&password=${payload.password}`), "payload", payload)

        if (netConnected) {
            yield put(startLoading());
            const { data = {} } = yield postRequest({
                API: API.SIGNIN(`?email=${payload.email}&password=${payload.password}`)
            })
            console.log(data, "sign in success");
            if (data && data.length && data[0].remark == 0) {
                alreadyRegistered()
            } else if (data && data.length && data[0].remark == 1) {
                yield put(updateAuthTokenRedux(data[0].id));
                success();
            } else {
                fail(data.msg);
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

function* signupSaga({ payload: { netConnected, payload = {}, alreadyRegistered = () => { }, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { status, data = {} } = yield postRequest({
                API: API.SIGNUP,
                DATA: { ...payload }
            })
            console.log(data);
            if (status == 200) {
                if (data.msg == 'Email is already registered with a different phone') {
                    alreadyRegistered()
                } else if (data.msg == 'OK' || data.userId) {
                    success();
                } else {
                    fail(data.msg);
                }
            } else {
                fail(data.msg)
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* logoutSaga({ payload: { } = {} }) {
    try {
        yield put(startLoading());
        yield put(reset());
        updateAuthToken('');
        replace(ROUTES.SIGNIN_SCREEN);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(SIGNIN_REQUEST, signinSaga),
        takeLatest(SIGNUP_REQUEST, signupSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
    ]);
}

export default AuthSaga;