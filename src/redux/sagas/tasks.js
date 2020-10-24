import { takeLatest, all, put, takeEvery } from 'redux-saga/effects';
import { startLoading, stopLoading, GET_PEOPLE_INVOLVED_REQUEST, GET_TASK_CATEGORIES_REQUEST, GET_USER_ADDRESSES_REQUEST, ADD_NEW_ADDRESSES_REQUEST, getUserAddressesRequest, CREATE_TASK_REQUEST, GET_HOUR_DETAILS_REQUEST, GET_HELP_REQUESTED_REQUEST, getHelpRequestedSuccess, GET_TASK_DETAILS_REQUEST, GET_OFFER_TO_HELP_REQUEST, getOfferToHelpSuccess, getHelpsIAmProvidingSuccess, GET_HELPS_I_AM_PROVIDING_REQUEST, CANCEL_TASK_REQUESTER, PROVIDER_OFFER_HELP, GET_COMMUNITY_HELP_REQ, getCommunityHelpRequestsSuccess, getWhatGoindAroundSuccess, INTERESTED_TO_HELP_REQUEST, ADD_HELP_CATEGORY_REQUEST, GET_POTENTIAL_MATCHES_REQUEST, GET_CONFIRMED_HELPERS_REQUEST, PROVIDER_REMOVE_HELP_REQUEST, PROVIDER_CANCEL_HELP_REQUEST, providerRemoveHelpSuccess, providerUpdateOfferHelpSuccess, ACCEPT_POTENTIAL_MATCH_REQUEST, REMOVE_POTENTIAL_MATCH_REQUEST, getUserDetailsSuccess, GET_TASK_ACTIVITY_REQUEST, GET_OTHER_FILTERS_REQUEST, REQUEST_CHECK_IN_REQUEST, REQUEST_CHECK_OUT_REQUEST, COMPLETE_CHECK_IN_REQUEST, CONFIRM_CHECK_IN_REQUEST, CONFIRM_CHECK_OUT_REQUEST, COMPLETE_CHECK_OUT_REQUEST, GET_DENIAL_REASON_CODES_REQUEST, DENY_CHECK_OUT_REQUEST, PROVIDE_FEEDBACK_REQUEST, interestedToHelpSuccess, GET_HELP_ITEMS_FILTER_REQUEST } from "../actions"
import { API } from "../../shared/constants/api"
import { postRequest, getRequest } from "../../shared/services/axios"
import { TEXT_CONST } from "../../shared"
import { invalid } from 'moment';

function* getTaskCategoriesSaga({ payload: { netConnected, type, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.TASK_HELP_ITEMS()
            })
            // console.log(data);
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
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
    }
}

function* getUserAddressesSaga({ payload: { netConnected, type = 'ALL', success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log(netConnected);
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.USER_ADDRESSES(),
                DATA: { address_type: type }
            })
            console.log(data);
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
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* addNewAddressesSaga({ payload: { netConnected, payload, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            !payload.address_label && delete payload.address_label
            console.log(payload);
            const { data = {}, status } = yield postRequest({
                API: API.ADD_NEW_ADDRESSES(),
                DATA: payload
            })
            console.log(data);
            if (status == 200 && data.msg == 'OK') {
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* createTaskSaga({ payload: { netConnected, payload, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log(payload);
            console.log(netConnected);
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.CREATE_TASK(),
                DATA: payload
            })
            console.log(data);
            if (status == 200 && data.msg == 'OK') {
                success(data.total_help_providers);
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getHourDetailsSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, status } = yield getRequest({
                API: API.HOURS_POINTS()
            })
            console.log(data);
            if (status == 200) {
                yield put(getUserDetailsSuccess({ hours: data.available_hours, points: data.available_points }))
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getHelpsRequestedSaga({ payload: { netConnected, page = 0, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, count, status } = yield postRequest({
                API: API.HELP_REQUESTS()
            })
            console.log(data);
            if (status == 200) {
                yield put(getHelpRequestedSuccess({ data: data || [], spread: !!page }));
                success();
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
    }
}

function* getOfferToHelpSaga({ payload: { loading = false, netConnected, page = 1, dateFilter = [], taskFilter = [], filters = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield loading && put(startLoading());
            console.log(JSON.stringify({
                p_page_index: page,
                date_time: dateFilter,
                task_id: taskFilter,
                ...filters
            }));
            const { data = {}, count, status } = yield postRequest({
                API: API.POTENTIAL_MATCHES_FOR_HELPER(),
                DATA: {
                    p_page_index: page,
                    date_time: dateFilter,
                    task_id: taskFilter,
                    ...filters
                }
            })
            console.log('getOfferToHelpSaga', data);
            if (status == 200) {
                yield put(getOfferToHelpSuccess({ data: data.data || [], spread: page != 1, count: data.countOfrecords.count_of_records }));
                success();
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getHelpsIAmProvidingSaga({ payload: { netConnected, page = 0, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, count, status } = yield getRequest({
                API: API.HELP_RESPONSES(),
            })
            console.log(data);
            if (status == 200) {
                yield put(getHelpsIAmProvidingSuccess({ data: data || [], spread: false }));
                success();
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
    }
}

function* getTaskDetailsSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.TASK_DETAILS(),
                DATA: { user_help_request_id: id }
            })
            console.log(data);
            if (status == 200) {
                success((data.data[0] || {}), data.preCheckinTime)
                console.log(data);
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

function* cancelsTaskRequester({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.CANCEL_TASK_REQUESTER,
                DATA: { user_help_request_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* providerOfferHelp({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.PROVIDER_OFFER_HELP,
                DATA: { user_help_response_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                if ((data[0] || {}).status == 'C') {
                    yield put(providerRemoveHelpSuccess({ id }))
                } else {
                    yield put(providerUpdateOfferHelpSuccess({ id, data: { match_status: (data[0] || {}).status } }))
                }
                success(data)
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

function* getConfirmedHelpersSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.CONFIRMED_HELPERS,
                DATA: { user_help_request_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* getPotentialMatchesSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.POTENTIAL_MATCHES_OF_TASK,
                DATA: { user_help_request_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* getCommunityHelpRequests({ payload: { netConnected, statusKey, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            const { data = {}, count, status } = yield postRequest({
                API: API.GET_COMMUNITY_HELP_REQ,
                DATA: { status: statusKey }
            })
            console.warn(data);
            if (status == 200) {
                {
                    statusKey == 'C' ?
                        yield put(getWhatGoindAroundSuccess({ data: data || [], spread: false }))
                        :
                        yield put(getCommunityHelpRequestsSuccess({ data: data || [], spread: false }))
                }
                success();
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

function* interestedToHelp({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.INTERESTED_TO_HELP,
                DATA: { help_request_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                yield put(interestedToHelpSuccess(id))
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* addHelpCategory({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.ADD_HELP_CATEGORY,
                DATA: { help_category_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* acceptPotentialMatchSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, count, status } = yield postRequest({
                API: API.CONFIRM_MY_MATCH,
                DATA: { user_help_response_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* removePotentialMatchSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.DENY_MY_MATCH,
                DATA: { user_help_response_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* getPeopleInvolvedSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.TASK_PEOPLE,
                DATA: { user_help_request_id: id }
            })
            if (status == 200) {
                success([...data.filter(item => item.person_type == 'R'), ...data.filter(item => (item.person_type != 'R' && item.it_is_me)), ...data.filter(item => (item.person_type != 'R' && !item.it_is_me))])
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

function* getTaskActivitySaga({ payload: { netConnected, id, userId, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.ACTIVITY_DETAILS,
                DATA: { user_help_request_id: id, provider_user_id: userId }
            })
            console.log(data);
            if (status == 200) {
                success(data || [])
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

function* providerRemoveHelpSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.PROVIDER_REMOVE_HELP,
                DATA: { user_help_response_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                yield put(providerRemoveHelpSuccess({ id }))
                success(data)
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

function* providerCancelHelpSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    console.log(id);
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.PROVIDER_CANCEL_HELP,
                DATA: { user_help_response_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                yield put(providerUpdateOfferHelpSuccess({ id, data: { match_status: (data[0] || {}).status } }))
                success(data)
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

function* getOtherFiltersSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.OTHER_FILTERS
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* completeCheckInSaga({ payload: { netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.COMPLETE_MY_CHECK_IN,
                DATA: { time_trading_contract_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* completeCheckOutSaga({ payload: { netConnected, id, minutes, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            console.log({
                time_trading_contract_id: id,
                time_awarded_override: minutes
            });
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.COMPLETE_MY_CHECK_OUT,
                DATA: {
                    time_trading_contract_id: id,
                    time_awarded_override: minutes
                }
            })
            console.log(data, status);
            if (status == 200) {
                success(data)
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

function* denyCheckOutSaga({ payload: { invalid, payload = {}, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.DENY_CHECK_OUT,
                DATA: { ...payload }
            })
            console.log(data, status);
            if (status == 200) {
                if (data[0].message == 'Update was Successful') {
                    success();
                } else {
                    invalid();
                }
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

function* confirmCheckOutSaga({ payload: { invalid, code, netConnected, id, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.CONFIRM_CHECK_OUT,
                DATA: {
                    time_trading_contract_id: id,
                    verification_code: code,
                }
            })
            console.log(data, status);
            if (status == 200) {
                if (data[0].message == 'Update was Successful') {
                    success();
                } else {
                    invalid();
                }
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

function* confirmCheckInSaga({ payload: { netConnected, id, code, invalid = () => { }, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.CONFIRM_CHECK_IN,
                DATA: {
                    time_trading_contract_id: id,
                    verification_code: code,
                }
            })
            console.log(data, status);
            if (status == 200) {
                if (data[0].message == 'Update was Successful') {
                    success();
                } else {
                    invalid();
                }
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

function* requestCheckOutSaga({ payload: { id, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.REQUEST_CHECK_OUT,
                DATA: { time_trading_contract_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(((data[0] || {}).checkout_verification_code || ''), ((data[0] || {}).calculated_time_awarded || '0'))
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

function* requestCheckInSaga({ payload: { id, netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.REQUEST_CHECK_IN,
                DATA: { time_trading_contract_id: id }
            })
            console.log(data, status);
            if (status == 200) {
                success(((data[0] || {}).checkin_verification_code || ''))
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getDenialReasonCodesSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.DENIAL_REASON_CODES
            })
            console.log(data);
            if (status == 200) {
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* provideFeedbackSaga({ payload: { netConnected, payload = {}, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield postRequest({
                API: API.PROVIDE_FEEDBACK,
                DATA: { ...payload }
            })
            console.log(data);
            if (status == 200) {
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* getHelpItemsFilterSaga({ payload: { netConnected, success = () => { }, fail = () => { } } = {} }) {
    try {
        if (netConnected) {
            yield put(startLoading());
            const { data = {}, status } = yield getRequest({
                API: API.HELP_ITEMS_FILTER
            })
            console.log(data, 'data');
            if (status == 200) {
                success(data)
            } else {
                fail(data.msg);
            }
        } else {
            fail(TEXT_CONST.INTERNET_ERROR)
        }
    }
    catch (error) {
        console.log(error);
        fail(JSON.stringify(error));
    }
    finally {
        yield put(stopLoading());
    }
}

function* TaskSaga() {
    yield all([
        takeEvery(GET_COMMUNITY_HELP_REQ, getCommunityHelpRequests),
        takeEvery(GET_HELP_ITEMS_FILTER_REQUEST, getHelpItemsFilterSaga),
        takeLatest(ACCEPT_POTENTIAL_MATCH_REQUEST, acceptPotentialMatchSaga),
        takeLatest(ADD_HELP_CATEGORY_REQUEST, addHelpCategory),
        takeLatest(ADD_NEW_ADDRESSES_REQUEST, addNewAddressesSaga),
        takeLatest(CANCEL_TASK_REQUESTER, cancelsTaskRequester),
        takeLatest(CREATE_TASK_REQUEST, createTaskSaga),
        takeLatest(GET_CONFIRMED_HELPERS_REQUEST, getConfirmedHelpersSaga),
        takeLatest(GET_HELP_REQUESTED_REQUEST, getHelpsRequestedSaga),
        takeLatest(GET_HELPS_I_AM_PROVIDING_REQUEST, getHelpsIAmProvidingSaga),
        takeLatest(GET_HOUR_DETAILS_REQUEST, getHourDetailsSaga),
        takeLatest(GET_OFFER_TO_HELP_REQUEST, getOfferToHelpSaga),
        takeLatest(GET_OTHER_FILTERS_REQUEST, getOtherFiltersSaga),
        takeLatest(GET_PEOPLE_INVOLVED_REQUEST, getPeopleInvolvedSaga),
        takeLatest(GET_POTENTIAL_MATCHES_REQUEST, getPotentialMatchesSaga),
        takeLatest(GET_TASK_ACTIVITY_REQUEST, getTaskActivitySaga),
        takeLatest(GET_TASK_CATEGORIES_REQUEST, getTaskCategoriesSaga),
        takeLatest(GET_TASK_DETAILS_REQUEST, getTaskDetailsSaga),
        takeLatest(GET_USER_ADDRESSES_REQUEST, getUserAddressesSaga),
        takeLatest(INTERESTED_TO_HELP_REQUEST, interestedToHelp),
        takeLatest(PROVIDER_CANCEL_HELP_REQUEST, providerCancelHelpSaga),
        takeLatest(PROVIDER_OFFER_HELP, providerOfferHelp),
        takeLatest(PROVIDER_REMOVE_HELP_REQUEST, providerRemoveHelpSaga),
        takeLatest(REMOVE_POTENTIAL_MATCH_REQUEST, removePotentialMatchSaga),
        takeLatest(REQUEST_CHECK_IN_REQUEST, requestCheckInSaga),
        takeLatest(REQUEST_CHECK_OUT_REQUEST, requestCheckOutSaga),
        takeLatest(COMPLETE_CHECK_IN_REQUEST, completeCheckInSaga),
        takeLatest(COMPLETE_CHECK_OUT_REQUEST, completeCheckOutSaga),
        takeLatest(CONFIRM_CHECK_IN_REQUEST, confirmCheckInSaga),
        takeLatest(CONFIRM_CHECK_OUT_REQUEST, confirmCheckOutSaga),
        takeLatest(GET_DENIAL_REASON_CODES_REQUEST, getDenialReasonCodesSaga),
        takeLatest(DENY_CHECK_OUT_REQUEST, denyCheckOutSaga),
        takeLatest(PROVIDE_FEEDBACK_REQUEST, provideFeedbackSaga),
    ]);
}

export default TaskSaga;