import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, TEST_CAT_REQUEST, TEST_SERIES_LIST_REQUEST, testSeriesListSuccess, testCatListSuccess, purchasedTestSeriesListSuccess, PURCHASED_TEST_SERIES_LIST_REQUEST, TEST_QUESTIONS_REQUEST, TEST_LIST_REQUEST, DAILY_QUIZ_REQUEST, TEST_RESULT_SUBMIT_REQUEST, GENERATE_PAYMENT_LINK_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest, postRequestWithParams } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getTestCatListSaga({ payload: { netConnected, _id, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_TEST_CATEGORIES(`?streamId=${_id}&date=${date}`)
            })
            console.log(data, "===========");
            if (status == 200) {
                yield put(testCatListSuccess(data))
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getTestSeriesListSaga({ payload: { netConnected, catId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_TEST_SERIES(`?catId=${catId}`)
            })
            console.log(API.GET_TEST_SERIES(`?catId=${catId}`))
            console.log(data, "===========");
            if (status == 200) {
                yield put(testSeriesListSuccess(data))
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getPurchasedTestSeriesListSaga({ payload: { netConnected, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_PURCHASED_TEST_LIST(`?sId=${sId}`)
            })
            console.log(API.GET_PURCHASED_TEST_LIST(`?sId=${sId}`))
            console.log(data, "===========");
            if (status == 200) {
                yield put(purchasedTestSeriesListSuccess(data))
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getTestQuestionsSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_TEST_QUESTIONS(`?id=${id}`)
            })
            console.log(API.GET_TEST_QUESTIONS(`?id=${id}`))
            console.log(data, "===========");
            if (status == 200) {
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getDailyQuizSaga({ payload: { netConnected, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_DAILY_QUIZ(`?date=${date}`)
            })
            console.log(API.GET_DAILY_QUIZ(`?date=${date}`))
            console.log(data, "===========");
            if (status == 200) {
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}


function* getTestListSaga({ payload: { netConnected, sId, catId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            let apiUrl = API.GET_TEST_LIST(`?sId=${sId}`)
            if (catId) {
                apiUrl = API.GET_TEST_LIST(`?sId=${sId}&catId=${catId}`)
            }
            const { data = {}, status } = yield getRequest({
                API: apiUrl
            })
            console.log(API.GET_TEST_LIST(`?sId=${sId}`))
            console.log(data, "===========");
            if (status == 200) {
                success(data.data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* postTestResultSaga({ payload: { netConnected, json, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("answersList", json)
        let jsonPayload = JSON.stringify(json)
        if (netConnected) {
            console.log(API.SUBMIT_TEST(`?json=${jsonPayload}`))
            yield put(startLoading());
            const { data = {}, status } = yield postRequestWithParams({
                API: API.SUBMIT_TEST(`?json=${jsonPayload}`)
            })

            console.log(data, "===========");
            if (status == 200) {
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}


function* generatePaymentLink({ payload: { netConnected, amount, purpose, sId, type, productId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("amount, purpose, sId, type, productId", amount, purpose, sId, type, productId)
        if (netConnected) {
            console.log(API.GENERATE_PAYMENT_LINK(`?amount=${amount}&purpose=${purpose}&sId=${sId}&type=${type}&productId=${productId}`))
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GENERATE_PAYMENT_LINK(`?amount=${amount}&purpose=${purpose}&sId=${sId}&type=${type}&productId=${productId}`)
            })

            console.log(data, "===========");
            if (status == 200) {
                success(data);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}



function* FriendsSaga() {
    yield all([
        takeEvery(TEST_CAT_REQUEST, getTestCatListSaga),
        takeEvery(TEST_SERIES_LIST_REQUEST, getTestSeriesListSaga),
        takeEvery(PURCHASED_TEST_SERIES_LIST_REQUEST, getPurchasedTestSeriesListSaga),
        takeEvery(TEST_QUESTIONS_REQUEST, getTestQuestionsSaga),
        takeEvery(TEST_LIST_REQUEST, getTestListSaga),
        takeEvery(DAILY_QUIZ_REQUEST, getDailyQuizSaga),
        takeEvery(TEST_RESULT_SUBMIT_REQUEST, postTestResultSaga),
        takeEvery(GENERATE_PAYMENT_LINK_REQUEST, generatePaymentLink)
    ]);
}

export default FriendsSaga;