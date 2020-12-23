export const GET_HELP_CATEGORIES_REQUEST = 'GET_HELP_CATEGORIES_REQUEST';

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';

export const GET_USER_PURCHASE_HISTORY_REQUEST = 'GET_USER_PURCHASE_HISTORY_REQUEST';
export const GET_USER_PURCHASE_HISTORY_SUCCESS = 'GET_USER_PURCHASE_HISTORY_SUCCESS';

export const getUserDetailsRequest = payload => {
    console.log("payload", payload)
    return {
        type: GET_USER_DETAILS_REQUEST,
        payload
    }
}

export const getUserDetailsSuccess = payload => {
    console.log("payload", payload)
    return {
        type: GET_USER_DETAILS_SUCCESS,
        payload
    }
}

export const updateUserDetailsRequest = payload => {
    return {
        type: UPDATE_USER_DETAILS_REQUEST,
        payload
    }
}

