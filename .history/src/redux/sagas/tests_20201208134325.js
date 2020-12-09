import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, TEST_CAT_REQUEST, TEST_SERIES_LIST_REQUEST, testSeriesListSuccess, testCatListSuccess, purchasedTestSeriesListSuccess, PURCHASED_TEST_SERIES_LIST_REQUEST, TEST_QUESTIONS_REQUEST, TEST_LIST_REQUEST, DAILY_QUIZ_REQUEST, TEST_RESULT_SUBMIT_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
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


function* getTestListSaga({ payload: { netConnected, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_TEST_LIST(`?sId=${sId}`)
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
        console.log("answersList", answersList)
        if (netConnected) {
            console.log(API.SUBMIT_TEST(`?sId=${sId}&id=${id}`))
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.SUBMIT_TEST(`?sId=${sId}&id=${id}`),
                DATA: { ...answersList }
            })

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






function* FriendsSaga() {
    yield all([
        takeEvery(TEST_CAT_REQUEST, getTestCatListSaga),
        takeEvery(TEST_SERIES_LIST_REQUEST, getTestSeriesListSaga),
        takeEvery(PURCHASED_TEST_SERIES_LIST_REQUEST, getPurchasedTestSeriesListSaga),
        takeEvery(TEST_QUESTIONS_REQUEST, getTestQuestionsSaga),
        takeEvery(TEST_LIST_REQUEST, getTestListSaga),
        takeEvery(DAILY_QUIZ_REQUEST, getDailyQuizSaga),
        takeEvery(TEST_RESULT_SUBMIT_REQUEST, postTestResultSaga)
    ]);
}

export default FriendsSaga;