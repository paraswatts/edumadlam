import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, NEWS_CAT_REQUEST, newsCatListSuccess, NEWS_SUB_CAT_SUCCESS, NEWS_SUB_CAT_REQUEST, newsSubCatListSuccess, NEWS_DETAIL_SUCCESS, NEWS_DETAIL_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getNewsCatListSaga({ payload: { netConnected, _id, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_NEWS_CATEGORIES(`?streamId=${_id}&date=${date}`)
            })
            console.log(data, "===========");
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
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getNewsSubCatListSaga({ payload: { netConnected, catId, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_NEWS_SUB_CATEGORIES(`?catId=${catId}`)
            })
            console.log(API.GET_NEWS_SUB_CATEGORIES(`?catId=${catId}`))
            console.log(data, "===========");
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
        console.log("hereee", error)
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getNewsDetailSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        console.log("netConnected", netConnected)
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_NEWS_DETAIL(`?id=${id}`)
            })
            console.log(API.GET_NEWS_DETAIL(`?id=${id}`))
            console.log(data, "===========");
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
        console.log("hereee", error)
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
        takeLatest(NEWS_DETAIL_REQUEST, getNewsDetailSaga)
    ]);
}

export default FriendsSaga;