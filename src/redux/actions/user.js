export const GET_HELP_CATEGORIES_REQUEST = 'GET_HELP_CATEGORIES_REQUEST';

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';

export const GET_USER_PURCHASE_HISTORY_REQUEST = 'GET_USER_PURCHASE_HISTORY_REQUEST';
export const GET_USER_PURCHASE_HISTORY_SUCCESS = 'GET_USER_PURCHASE_HISTORY_SUCCESS';


export const GET_MONTHLY_MAGAZINE_REQUEST = 'GET_MONTHLY_MAGAZINE_REQUEST';
export const GET_MONTHLY_MAGAZINE_SUCCESS = 'GET_MONTHLY_MAGAZINE_SUCCESS';

export const getUserDetailsRequest = payload => {
    return {
        type: GET_USER_DETAILS_REQUEST,
        payload
    }
}

export const getUserDetailsSuccess = payload => {
    return {
        type: GET_USER_DETAILS_SUCCESS,
        payload
    }
}


export const getUserPurchaseHistoryRequest = payload => {
    return {
        type: GET_USER_PURCHASE_HISTORY_REQUEST,
        payload
    }
}

export const getUserPurchaseHistorySuccess = payload => {
    return {
        type: GET_USER_PURCHASE_HISTORY_SUCCESS,
        payload
    }
}

export const getMonthlyMagazineRequest = payload => {
    return {
        type: GET_MONTHLY_MAGAZINE_REQUEST,
        payload
    }
}

export const getMonthlyMagazineSuccess = payload => {
    return {
        type: GET_MONTHLY_MAGAZINE_SUCCESS,
        payload
    }
}

export const updateUserDetailsRequest = payload => {
    return {
        type: UPDATE_USER_DETAILS_REQUEST,
        payload
    }
}

