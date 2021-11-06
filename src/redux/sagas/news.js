import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, NEWS_CAT_REQUEST, newsCatListSuccess, NEWS_SUB_CAT_SUCCESS, NEWS_SUB_CAT_REQUEST, newsSubCatListSuccess, NEWS_DETAIL_SUCCESS, NEWS_DETAIL_REQUEST, TAG_SEARCH_REQUEST, tagSearchRequest } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getNewsCatListSaga({ payload: { netConnected, _id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_NEWS_CATEGORIES(`?streamId=${_id}`)
            })
            yield put(stopLoading());
            if (status == 200) {
                yield put(newsCatListSuccess(data))
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

function* getNewsSubCatListSaga({ payload: { netConnected, catId, date, tagId, onlyTag, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            console.log("news list", API.GET_NEWS_SUB_CATEGORIES(`?tagId=${tagId}`))
            let apiUrl = API.GET_NEWS_SUB_CATEGORIES(`?catId=${catId}&date=${date}` + (tagId ? `&tagId=${tagId}` : ''))
            if (onlyTag) {
                apiUrl = API.GET_NEWS_SUB_CATEGORIES(`?tagId=${tagId}`)
            }
            const { data = {}, status } = yield getRequest({
                API: apiUrl
            })
            console.log("data", data)

            yield put(stopLoading());
            if (status == 200) {
                yield put(newsSubCatListSuccess(data))
                success(data);
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

function* searchTagsSaga({ payload: { netConnected, searchTerm, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log("tag search", API.SEARCH_TAG(`?tag=${searchTerm}`))
            let apiUrl = API.SEARCH_TAG(`?tag=${searchTerm}`)
            const { data = {}, status } = yield getRequest({
                API: apiUrl
            })
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
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}


function* getNewsDetailSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            console.log("API.GET_NEWS_DETAIL(`?id=${id}`", API.GET_NEWS_DETAIL(`?id=${id}`))
            const { data = {}, status } = yield getRequest({
                API: API.GET_NEWS_DETAIL(`?id=${id}`)
            })
            yield put(stopLoading());
            if (status == 200) {
                yield put(newsSubCatListSuccess(data))
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



function* FriendsSaga() {
    yield all([
        takeEvery(NEWS_CAT_REQUEST, getNewsCatListSaga),
        takeEvery(NEWS_SUB_CAT_REQUEST, getNewsSubCatListSaga),
        takeLatest(NEWS_DETAIL_REQUEST, getNewsDetailSaga),
        takeLatest(TAG_SEARCH_REQUEST, searchTagsSaga)
    ]);
}

export default FriendsSaga;