import { takeLatest, all, put } from 'redux-saga/effects';
import { startLoading, stopLoading, UPDATE_ONB_STATUS_REQUEST, UPDATE_USER_NEIGHBORHOOD_REQUEST, GET_USER_DETAILS_REQUEST, UPDATE_USER_DETAILS_REQUEST, GET_HELP_CATEGORIES_REQUEST, UPDATE_USER_HELP_CATEGORIES_REQUEST, GET_TYPE_AHEAD_ADDRESS_REQUEST, getUserDetailsSuccess, GET_USER_INTERESTS, UPDATE_USER_INTERESTS, GET_MOVED_COUNT_REQUEST, RESET_MOVED_COUNT_REQUEST, UPDATE_USER_AVAILABILITY_REQUEST, getUserAvailabilitySuccess, GET_USER_AVAILABILITY_REQUEST, GET_USER_STATS, SEND_EMAIL_TO_VERIFY, GET_OTHER_USER_ADDRESS_REQUEST, UPLOAD_PROFILE_PIC_REQUEST, GET_PREFERENCES_REQUEST, UPDATE_PREFERENCES_REQUEST, UPDATE_USER_ADDRESS_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"

function* getUserDetailsSaga({ payload: { netConnected, type, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {} } = yield getRequest({
                API: API.PROFILE(type && `?profileType=${type}`)
            })
            yield put(getUserDetailsSuccess(data[0]))
            success(data[0])
            console.log(data);
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

function* updateUserDetailsSaga({ payload: { loading = true, netConnected, withPhoto = false, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield loading && put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: withPhoto ? API.PROFILE_WITH_PHOTO : API.PROFILE(),
                DATA: payload
            })
            if (status == 200) {
                if (data.msg == 'OK') {
                    !payload.address && (delete payload.address);
                    payload.mode && (delete payload.mode)
                    yield put(getUserDetailsSuccess({ ...payload }))
                    success()
                } else {
                    fail(data.msg)
                }
            } else if (status == 401) {
                fail(data.msg)
            } else {
                fail(data.msg)
            }
            console.log(data);
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

function* updateUserNeighborhoodSaga({ payload: { loading = true, updateUser = false, netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield loading && put(startLoading());
            console.log(payload);
            const { data = {}, status } = yield postRequest({
                API: API.NEIGHBORHOOD(),
                DATA: payload
            })
            console.log(data);
            if (status == 200) {
                if (data[0].msg == 'OK') {
                    yield updateUser && put(getUserDetailsSuccess({ neighborhood: payload.code_or_name }))
                    success(data[0])
                }
            } else if (status == 401) {
                fail(data.msg)
            }
            console.log(data);
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

function* getHelpCategoriesSaga({ payload: { netConnected, userId, filter, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield !filter && put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.HELP_CATEGORIES(filter ? `?filter=${filter}${userId ? `&friend_id=${userId}` : ''}` : '')
            })
            if (status == 200) {
                yield (filter && !userId) && put(getUserDetailsSuccess({ userHelpCategories: data }))
                success(data)
            } else if (status == 401) {
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

function* updateUserHelpCategoriesSaga({ payload: { payload = {}, selected = [], netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.HELP_CATEGORIES(),
                DATA: payload
            })
            if (status == 200) {
                yield put(getUserDetailsSuccess({ userHelpCategories: selected }))
                success()
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

function* getTypeAheadAddressSaga({ payload: { payload = {}, search = '', netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.TYPE_AHEAD_ADDRESS(`?start=${search}`)
            })
            if (status == 200) {
                success(data)
            } else if (status == 401) {
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
    }
}


function* updateOnbStatusSaga({ payload: { payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.ONB_STEPS,
                DATA: payload
            })
            console.log(data);
            if (status == 200 && data.msg == 'OK') {
                success(data)
            } else if (status == 401) {
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

function* getUserInterestsSaga({ payload: { netConnected, userId, filter = '', success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield !filter && put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.USER_INTERESTS(filter ? `?filter=${filter}${userId ? `&friend_id=${userId}` : ''}` : '')
            })
            if (status == 200) {
                yield (filter && !userId) && put(getUserDetailsSuccess({ userInterests: data }))
                success(data)
            } else if (status == 401) {
                fail(data.msg)
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

function* updateUserInterestsSaga({ payload: { payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.USER_INTERESTS(),
                DATA: payload
            })
            if (status == 200) {
                success()
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

function* gettMovedCountSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.MOVED
            })
            if (status == 200) {
                success(data[0].total_count)
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
    }
}

function* resetMovedCountSaga({ payload: { payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield postRequest({
                API: API.RESET_MOVE,
                DATA: payload
            })
            console.log(data);
            if (status == 200) {
                success()
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
    }
}

function* updateUserAvailabilitySaga({ payload: { isavailable, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(getUserAvailabilitySuccess(isavailable))
            const { data = {}, status } = yield postRequest({
                API: API.USER_AVAILABILITY,
                DATA: { isavailable: isavailable ? 1 : 0 }
            })
            if (status == 200) {
                success()
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
    }
}

function* getUserAvailabilitySaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.USER_AVAILABILITY
            })
            if (status == 200) {
                yield put(getUserAvailabilitySuccess(data.isavailable == 1))
                success()
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
        yield put(stopLoading())
    }
}

function* getOtherUserAddressSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading())
            const { data = {}, status } = yield getRequest({
                API: API.VERIFIED_COUNT(`?friend_id=${id}`)
            })
            if (status == 200) {
                success(data[0])
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
        yield put(stopLoading())
    }
}

function* getUserStatsSaga({ payload: { payload = {}, userId = null, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.USER_STATS(userId ? `?friend_id=${userId}` : ''),
                DATA: payload
            })
            console.log(data);
            if (status == 200) {
                yield !userId && put(getUserDetailsSuccess({ userStats: data }))
                success(data)
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

function* sendEmailToVerifySaga({ payload: { payload, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.SEND_EMAIL_TO_VERIFY,
                DATA: payload
            })
            if (status == 200) {
                success(data)
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

function* uploadProfilePic({ payload: { payload, photoname = '', netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.UPLOAD_PROFILE_PIC,
                DATA: payload
            })
            if (status == 200) {
                yield put(getUserDetailsSuccess({ photoname: data.msg }))
                success()
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

function* getPreferencesSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.PREFERENCES,
            })
            console.log(data);
            if (status == 200) {
                yield put(getUserDetailsSuccess({ preferences: data }))
                success(data)
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
    }
}

function* updatePreferencesSaga({ payload: { payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            // yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.PREFERENCES,
                DATA: payload
            })
            if (status == 200) {
                if (data.msg == 'OK') {
                    yield put(getUserDetailsSuccess({ preferences: { ...payload } }))
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

function* updateAddressSaga({ payload: { payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.UPDATE_USER_ADDRESS,
                DATA: payload
            })
            if (status == 200) {
                if (data.msg == 'OK') {
                    yield put(getUserDetailsSuccess({ ...payload }))
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

function* AuthSaga() {
    yield all([
        takeLatest(GET_HELP_CATEGORIES_REQUEST, getHelpCategoriesSaga),
        takeLatest(GET_MOVED_COUNT_REQUEST, gettMovedCountSaga),
        takeLatest(GET_OTHER_USER_ADDRESS_REQUEST, getOtherUserAddressSaga),
        takeLatest(GET_TYPE_AHEAD_ADDRESS_REQUEST, getTypeAheadAddressSaga),
        takeLatest(GET_USER_AVAILABILITY_REQUEST, getUserAvailabilitySaga),
        takeLatest(GET_USER_DETAILS_REQUEST, getUserDetailsSaga),
        takeLatest(GET_USER_INTERESTS, getUserInterestsSaga),
        takeLatest(GET_USER_STATS, getUserStatsSaga),
        takeLatest(RESET_MOVED_COUNT_REQUEST, resetMovedCountSaga),
        takeLatest(SEND_EMAIL_TO_VERIFY, sendEmailToVerifySaga),
        takeLatest(UPDATE_ONB_STATUS_REQUEST, updateOnbStatusSaga),
        takeLatest(UPDATE_USER_AVAILABILITY_REQUEST, updateUserAvailabilitySaga),
        takeLatest(UPDATE_USER_DETAILS_REQUEST, updateUserDetailsSaga),
        takeLatest(UPDATE_USER_HELP_CATEGORIES_REQUEST, updateUserHelpCategoriesSaga),
        takeLatest(UPDATE_USER_INTERESTS, updateUserInterestsSaga),
        takeLatest(UPDATE_USER_NEIGHBORHOOD_REQUEST, updateUserNeighborhoodSaga),
        takeLatest(UPLOAD_PROFILE_PIC_REQUEST, uploadProfilePic),
        takeLatest(GET_PREFERENCES_REQUEST, getPreferencesSaga),
        takeLatest(UPDATE_PREFERENCES_REQUEST, updatePreferencesSaga),
        takeLatest(UPDATE_USER_ADDRESS_REQUEST, updateAddressSaga),
    ]);
}

export default AuthSaga;