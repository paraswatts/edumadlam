import { takeLatest, all, put, takeEvery } from 'redux-saga/effects';
import { startLoading, getUserDetailsSuccess, stopLoading, GET_USER_DETAILS_REQUEST, GET_USER_PURCHASE_HISTORY_REQUEST, GET_MONTHLY_MAGAZINE_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"

function* getUserDetailsSaga({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { status, data = {} } = yield postRequest({
                API: API.GET_USER_PROFILE(`?sId=${payload.sId}`)
            })
            console.log("data", data)
            if (status == 200) {
                if (data[0]._email) {
                    yield put(getUserDetailsSuccess(data[0]));
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getUserPurchaseHistorySaga({ payload: { netConnected, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { status, data = {} } = yield postRequest({
                API: API.GET_USER_PURCHASE_HISTORY(`?sId=${sId}`)
            })
            if (status == 200 && data && data.data) {
                success(data.data)
            } else {
                fail(data[0].msg)
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

function* getMonthlyMagazineSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { status, data = {} } = yield postRequest({
                API: API.GET_MONTHLY_MAGAZINE
            })

            console.log(API.GET_MONTHLY_MAGAZINE, "data", data)
            if (status == 200 && data) {
                success(data)
            } else {
                fail("Something went wrong")
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



function* AuthSaga() {
    yield all([
        takeLatest(GET_USER_DETAILS_REQUEST, getUserDetailsSaga),
        takeEvery(GET_USER_PURCHASE_HISTORY_REQUEST, getUserPurchaseHistorySaga),
        takeEvery(GET_MONTHLY_MAGAZINE_REQUEST, getMonthlyMagazineSaga)])

}

export default AuthSaga;