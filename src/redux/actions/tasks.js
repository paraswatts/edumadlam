export const GET_TASK_CATEGORIES_REQUEST = 'GET_TASK_CATEGORIES_REQUEST';
export const GET_USER_ADDRESSES_REQUEST = 'GET_USER_ADDRESSES_REQUEST';
export const ADD_NEW_ADDRESSES_REQUEST = 'ADD_NEW_ADDRESSES_REQUEST';
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const GET_HOUR_DETAILS_REQUEST = 'GET_HOUR_DETAILS_REQUEST';
export const GET_HELP_REQUESTED_REQUEST = 'GET_HELP_REQUESTED_REQUEST';
export const GET_HELP_REQUESTED_SUCCESS = 'GET_HELP_REQUESTED_SUCCESS';
export const GET_TASK_DETAILS_REQUEST = 'GET_TASK_DETAILS_REQUEST';
export const ACCEPT_POTENTIAL_MATCH_REQUEST = 'ACCEPT_POTENTIAL_MATCH_REQUEST';
export const REMOVE_POTENTIAL_MATCH_REQUEST = 'REMOVE_POTENTIAL_MATCH_REQUEST';
export const GET_OFFER_TO_HELP_REQUEST = 'GET_OFFER_TO_HELP_REQUEST';
export const GET_OFFER_TO_HELP_SUCCESS = 'GET_OFFER_TO_HELP_SUCCESS';
export const GET_HELPS_I_AM_PROVIDING_REQUEST = 'GET_HELPS_I_AM_PROVIDING_REQUEST';
export const GET_HELPS_I_AM_PROVIDING_SUCCESS = 'GET_HELPS_I_AM_PROVIDING_SUCCESS';
export const CANCEL_TASK_REQUESTER = 'CANCEL_TASK_REQUESTER';
export const PROVIDER_OFFER_HELP = 'PROVIDER_OFFER_HELP';
export const PROVIDER_UPDATE_OFFER_HELP_SUCCESS = 'PROVIDER_UPDATE_OFFER_HELP_SUCCESS';
export const GET_COMMUNITY_HELP_REQ = 'GET_COMMUNITY_HELP_REQ';
export const GET_COMMUNITY_HELP_REQ_SUCCESS = 'GET_COMMUNITY_HELP_REQ_SUCCESS';
export const GET_WHAT_GOING_AROUND_SUCCESS = 'GET_WHAT_GOING_AROUND_SUCCESS';
export const GET_POTENTIAL_MATCHES_REQUEST = 'GET_POTENTIAL_MATCHES_REQUEST';
export const GET_CONFIRMED_HELPERS_REQUEST = 'GET_CONFIRMED_HELPERS_REQUEST';
export const INTERESTED_TO_HELP_REQUEST = 'INTERESTED_TO_HELP_REQUEST';
export const INTERESTED_TO_HELP_SUCCESS = 'INTERESTED_TO_HELP_SUCCESS';
export const ADD_HELP_CATEGORY_REQUEST = 'ADD_HELP_CATEGORY_REQUEST';
export const GET_PEOPLE_INVOLVED_REQUEST = 'GET_PEOPLE_INVOLVED_REQUEST';
export const GET_TASK_ACTIVITY_REQUEST = 'GET_TASK_ACTIVITY_REQUEST';
export const PROVIDER_REMOVE_HELP_REQUEST = 'PROVIDER_REMOVE_HELP_REQUEST';
export const PROVIDER_REMOVE_HELP_SUCCESS = 'PROVIDER_REMOVE_HELP_SUCCESS';
export const PROVIDER_CANCEL_HELP_REQUEST = 'PROVIDER_CANCEL_HELP_REQUEST';
export const PROVIDER_CANCEL_HELP_SUCCESS = 'PROVIDER_CANCEL_HELP_SUCCESS';
export const GET_OTHER_FILTERS_REQUEST = 'GET_OTHER_FILTERS_REQUEST';
export const REQUEST_CHECK_IN_REQUEST = 'REQUEST_CHECK_IN_REQUEST';
export const CONFIRM_CHECK_IN_REQUEST = 'CONFIRM_CHECK_IN_REQUEST';
export const COMPLETE_CHECK_IN_REQUEST = 'COMPLETE_CHECK_IN_REQUEST';
export const COMPLETE_CHECK_OUT_REQUEST = 'COMPLETE_CHECK_OUT_REQUEST';
export const DENY_CHECK_OUT_REQUEST = 'DENY_CHECK_OUT_REQUEST';
export const REQUEST_CHECK_OUT_REQUEST = 'REQUEST_CHECK_OUT_REQUEST';
export const CONFIRM_CHECK_OUT_REQUEST = 'CONFIRM_CHECK_OUT_REQUEST';
export const GET_DENIAL_REASON_CODES_REQUEST = 'GET_DENIAL_REASON_CODES_REQUEST';
export const PROVIDE_FEEDBACK_REQUEST = 'PROVIDE_FEEDBACK_REQUEST';
export const GET_HELP_ITEMS_FILTER_REQUEST = 'GET_HELP_ITEMS_FILTER_REQUEST';

export const getHelpItemsFilterRequest = (payload) => {
    return {
        type: GET_HELP_ITEMS_FILTER_REQUEST,
        payload
    }
}

export const getDenialReasonCodesRequest = (payload) => {
    return {
        type: GET_DENIAL_REASON_CODES_REQUEST,
        payload
    }
}

export const requestCheckInRequest = (payload) => {
    return {
        type: REQUEST_CHECK_IN_REQUEST,
        payload
    }
}

export const confirmCheckInRequest = (payload) => {
    return {
        type: CONFIRM_CHECK_IN_REQUEST,
        payload
    }
}

export const completeCheckInRequest = (payload) => {
    return {
        type: COMPLETE_CHECK_IN_REQUEST,
        payload
    }
}

export const completeCheckOutRequest = (payload) => {
    return {
        type: COMPLETE_CHECK_OUT_REQUEST,
        payload
    }
}

export const denyCheckOutRequest = (payload) => {
    return {
        type: DENY_CHECK_OUT_REQUEST,
        payload
    }
}
export const provideFeedbackRequest = (payload) => {
    return {
        type: PROVIDE_FEEDBACK_REQUEST,
        payload
    }
}

export const requestCheckOutRequest = (payload) => {
    return {
        type: REQUEST_CHECK_OUT_REQUEST,
        payload
    }
}

export const confirmCheckOutRequest = (payload) => {
    return {
        type: CONFIRM_CHECK_OUT_REQUEST,
        payload
    }
}

export const getOtherFiltersRequest = (payload) => {
    return {
        type: GET_OTHER_FILTERS_REQUEST,
        payload
    }
}

export const getPotentialMatchesRequest = (payload) => {
    return {
        type: GET_POTENTIAL_MATCHES_REQUEST,
        payload
    }
}

export const getTaskActivityRequest = (payload) => {
    return {
        type: GET_TASK_ACTIVITY_REQUEST,
        payload
    }
}

export const getPeopleInvolvedRequest = (payload) => {
    return {
        type: GET_PEOPLE_INVOLVED_REQUEST,
        payload
    }
}

export const acceptPotentialMatchRequest = (payload) => {
    return {
        type: ACCEPT_POTENTIAL_MATCH_REQUEST,
        payload
    }
}

export const removePotentialMatchRequest = (payload) => {
    return {
        type: REMOVE_POTENTIAL_MATCH_REQUEST,
        payload
    }
}

export const getConfirmedHelpersRequest = (payload) => {
    return {
        type: GET_CONFIRMED_HELPERS_REQUEST,
        payload
    }
}

export const getHelpsIAmProvidingRequest = (payload) => {
    return {
        type: GET_HELPS_I_AM_PROVIDING_REQUEST,
        payload
    }
}

export const getHelpsIAmProvidingSuccess = (payload) => {
    return {
        type: GET_HELPS_I_AM_PROVIDING_SUCCESS,
        payload
    }
}

export const getOfferToHelpSuccess = (payload) => {
    return {
        type: GET_OFFER_TO_HELP_SUCCESS,
        payload
    }
}

export const getOfferToHelpRequest = (payload) => {
    return {
        type: GET_OFFER_TO_HELP_REQUEST,
        payload
    }
}

export const getTaskDetailsRequest = (payload) => {
    return {
        type: GET_TASK_DETAILS_REQUEST,
        payload
    }
}

export const addNewAddressesRequest = (payload) => {
    return {
        type: ADD_NEW_ADDRESSES_REQUEST,
        payload
    }
}

export const getHelpRequestedSuccess = (payload) => {
    return {
        type: GET_HELP_REQUESTED_SUCCESS,
        payload
    }
}

export const getHelpRequestedRequest = (payload) => {
    return {
        type: GET_HELP_REQUESTED_REQUEST,
        payload
    }
}

export const getHourDetailsRequest = (payload) => {
    return {
        type: GET_HOUR_DETAILS_REQUEST,
        payload
    }
}

export const createTaskRequest = (payload) => {
    return {
        type: CREATE_TASK_REQUEST,
        payload
    }
}

export const getUserAddressesRequest = (payload) => {
    return {
        type: GET_USER_ADDRESSES_REQUEST,
        payload
    }
}

export const getTaskCategoriesRequest = (payload) => {
    return {
        type: GET_TASK_CATEGORIES_REQUEST,
        payload
    }
}

export const cancelsTaskRequester = (payload) => {
    return {
        type: CANCEL_TASK_REQUESTER,
        payload
    }
}

export const providerOfferHelp = (payload) => {
    return {
        type: PROVIDER_OFFER_HELP,
        payload
    }
}

export const getCommunityHelpRequests = (payload) => {
    return {
        type: GET_COMMUNITY_HELP_REQ,
        payload
    }
}

export const getCommunityHelpRequestsSuccess = (payload) => {
    return {
        type: GET_COMMUNITY_HELP_REQ_SUCCESS,
        payload
    }
}

export const getWhatGoindAroundSuccess = (payload) => {
    return {
        type: GET_WHAT_GOING_AROUND_SUCCESS,
        payload
    }
}

export const interestedToHelpRequest = (payload) => {
    return {
        type: INTERESTED_TO_HELP_REQUEST,
        payload
    }
}

export const interestedToHelpSuccess = (payload) => {
    return {
        type: INTERESTED_TO_HELP_SUCCESS,
        payload
    }
}

export const addHelpCategoryRequest = (payload) => {
    return {
        type: ADD_HELP_CATEGORY_REQUEST,
        payload
    }
}

export const providerRemoveHelpRequest = (payload) => {
    return {
        type: PROVIDER_REMOVE_HELP_REQUEST,
        payload
    }
}

export const providerRemoveHelpSuccess = (payload) => {
    return {
        type: PROVIDER_REMOVE_HELP_SUCCESS,
        payload
    }
}

export const providerCancelHelpRequest = (payload) => {
    return {
        type: PROVIDER_CANCEL_HELP_REQUEST,
        payload
    }
}

export const providerUpdateOfferHelpSuccess = (payload) => {
    return {
        type: PROVIDER_UPDATE_OFFER_HELP_SUCCESS,
        payload
    }
}