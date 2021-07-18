import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { VERIFY_PROMO_REQUEST, streamSucess, startLoading, stopLoading, IMPORTANT_CAT_REQUEST, importantCatListSuccess, IMPORTANT_SUB_CAT_SUCCESS, IMPORTANT_SUB_CAT_REQUEST, importantSubCatListSuccess, IMPORTANT_DETAIL_SUCCESS, IMPORTANT_DETAIL_REQUEST, GET_STREAM_LIST_SUCCESS, GET_STREAM_LIST_REQUEST, IMP_SUB_CAT_REQUEST, IMPORTANT_CHAPTER_REQUEST, importantChapterListSuccess } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getImportantCatListSaga({ payload: { netConnected, _id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_CATEGORIES(`?streamId=${_id}`)
            })
            console.log("data", data)
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getImportantSubCats({ payload: { netConnected, _id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_SUB_CATEGORIES_LIST(`?catId=${_id}`)
            })
            console.log(API.GET_IMPORTANT_SUB_CATEGORIES_LIST(`?catId=${_id}`), "data", data)
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getStreamListSaga({ payload: { netConnected } }) {
    try {
        if (netConnected) {
            // yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_STREAM_LIST
            })
            console.log("data", data)
            if (status == 200) {
                yield put(streamSucess(data))
            } else {
                //fail("Failed to fetch");
            }
        } else {
            // fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        // fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getImportantSubCatListSaga({ payload: { netConnected, catId, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_SUB_CATEGORIES(`?catId=${catId}&sId=${sId}`)
            })
            console.log("data", data)
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getImportantDetailSaga({ payload: { netConnected, id, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_IMPORTANT_DETAIL(`?id=${id}&sId=${sId}`)
            })
            console.log("data======", data)
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}


function* getImportantChapterList({ payload: { netConnected, _id, sId, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            console.log("sId saga", sId)
            let apiUrl = sId ? API.GET_IMPORTANT_CHAPTER_LIST(`?sId=${sId}`) : API.GET_IMPORTANT_CHAPTER_LIST(`?catId=${_id}`)
            const { data = {}, status } = yield getRequest({
                API: apiUrl
            })
            console.log(apiUrl)
            if (status == 200) {
                yield put(importantChapterListSuccess(data))
                success(data);
            } else {
                fail(data.msg);
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

function* verifyPromo({ payload: { netConnected, promoCode, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.VERIFY_PROMO(`?promoCode=${promoCode}`)
            })
            console.log(data, "verifyPromo", API.VERIFY_PROMO(`?promoCode=${promoCode}`))
            if (data && data.length && data[0]._status == 1) {
                success(data);
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

function* FriendsSaga() {
    yield all([
        takeEvery(IMPORTANT_CAT_REQUEST, getImportantCatListSaga),
        takeEvery(IMPORTANT_SUB_CAT_REQUEST, getImportantSubCatListSaga),
        takeLatest(IMPORTANT_DETAIL_REQUEST, getImportantDetailSaga),
        takeLatest(GET_STREAM_LIST_REQUEST, getStreamListSaga),
        takeLatest(IMP_SUB_CAT_REQUEST, getImportantSubCats),
        takeLatest(IMPORTANT_CHAPTER_REQUEST, getImportantChapterList),
        takeLatest(VERIFY_PROMO_REQUEST, verifyPromo)
    ]);
}

export default FriendsSaga;