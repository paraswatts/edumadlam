import { takeLatest, all, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, VIDEO_LIST_REQUEST, videoListSuccess, YOUTUBE_VIDEO_CATEGORY_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"


function* getVideoListSaga({ payload: { netConnected, _id, homePage, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            let apiUrl = API.GET_VIDEO_LIST(`?catId=${_id}`)
            if (homePage) {
                apiUrl = API.GET_VIDEO_LIST(`?catId=${_id}&homePage=1`)
            }
            const { data = {}, status } = yield getRequest({
                API: apiUrl
            })
            console.log(apiUrl)
            if (status == 200) {
                yield put(videoListSuccess(data))
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


function* getYoutubeVideoCategories({ payload: { netConnected, _id, date, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.GET_YOUTUBE_VIDEO_CATEGORIES(`?streamId=${_id}&date=${date}`)
            })
            if (status == 200) {
                yield put(videoListSuccess(data))
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

function* VideosSaga() {
    yield all([
        takeEvery(VIDEO_LIST_REQUEST, getVideoListSaga),
        takeEvery(YOUTUBE_VIDEO_CATEGORY_REQUEST, getYoutubeVideoCategories)
    ]);
}

export default VideosSaga;