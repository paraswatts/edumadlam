import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { streamSucess, startLoading, stopLoading, IMPORTANT_CAT_REQUEST, importantCatListSuccess, IMPORTANT_SUB_CAT_SUCCESS, IMPORTANT_SUB_CAT_REQUEST, importantSubCatListSuccess, IMPORTANT_DETAIL_SUCCESS, IMPORTANT_DETAIL_REQUEST, GET_STREAM_LIST_SUCCESS, GET_STREAM_LIST_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getImportantCatListSaga({ payload: { netConnected, _id, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log(API.GET_IMPORTANT_CATEGORIES(`?streamId=${_id}`))
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_CATEGORIES(`?streamId=${_id}&date=${date}`)
            })
            console.log(data, "===========");
            if (status == 200) {
                yield put(importantCatListSuccess(data))
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

function* getStreamListSaga({ payload: { netConnected } }) {
    console.log("here")
    try {
        console.log(netConnected, "netConnected")
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_STREAM_LIST
            })
            // console.log(data, "===========");
            if (status == 200) {
                yield put(streamSucess(data))
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
        console.log("fianlly")
        yield put(stopLoading());
    }
}

function* getImportantSubCatListSaga({ payload: { netConnected, catId, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_SUB_CATEGORIES(`?catId=${catId}&date=${date}`)
            })
            console.log(API.GET_IMPORTANT_SUB_CATEGORIES(`?catId=${catId}`))
            console.log(data, "===========");
            if (status == 200) {
                yield put(importantSubCatListSuccess(data))
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

function* getImportantDetailSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_DETAIL(`?id=${id}`)
            })
            console.log(API.GET_IMPORTANT_DETAIL(`?id=${id}`))
            console.log(data, "===========");
            if (status == 200) {
                yield put(importantSubCatListSuccess(data))
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
        takeEvery(IMPORTANT_CAT_REQUEST, getImportantCatListSaga),
        takeEvery(IMPORTANT_SUB_CAT_REQUEST, getImportantSubCatListSaga),
        takeLatest(IMPORTANT_DETAIL_REQUEST, getImportantDetailSaga),
        takeLatest(GET_STREAM_LIST_REQUEST, getStreamListSaga)
    ]);
}

export default FriendsSaga;