export const GET_HELP_CATEGORIES_REQUEST = 'GET_HELP_CATEGORIES_REQUEST';
export const GET_MOVED_COUNT_REQUEST = 'GET_MOVED_COUNT_REQUEST';
export const GET_OTHER_USER_ADDRESS_REQUEST = 'GET_OTHER_USER_ADDRESS_REQUEST';
export const GET_PREFERENCES_REQUEST = 'GET_PREFERENCES_REQUEST';
export const GET_TYPE_AHEAD_ADDRESS_REQUEST = 'GET_TYPE_AHEAD_ADDRESS_REQUEST';
export const GET_USER_AVAILABILITY_REQUEST = 'GET_USER_AVAILABILITY_REQUEST';
export const GET_USER_AVAILABILITY_SUCCESS = 'GET_USER_AVAILABILITY_SUCCESS';
export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_INTERESTS = 'GET_USER_INTERESTS';
export const GET_USER_STATS = 'GET_USER_STATS';
export const RESET_MOVED_COUNT_REQUEST = 'RESET_MOVED_COUNT_REQUEST';
export const UPDATE_ONB_STATUS_REQUEST = 'UPDATE_ONB_STATUS_REQUEST';
export const UPDATE_PREFERENCES_REQUEST = 'UPDATE_PREFERENCES_REQUEST';
export const UPDATE_USER_ADDRESS_REQUEST = 'UPDATE_USER_ADDRESS_REQUEST';
export const UPDATE_USER_AVAILABILITY_REQUEST = 'UPDATE_USER_AVAILABILITY_REQUEST';
export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';
export const UPDATE_USER_HELP_CATEGORIES_REQUEST = 'UPDATE_USER_HELP_CATEGORIES_REQUEST';
export const UPDATE_USER_INTERESTS = 'UPDATER_USER_INTERESTS';
export const UPDATE_USER_NEIGHBORHOOD_REQUEST = 'UPDATE_USER_NEIGHBORHOOD_REQUEST';
export const UPLOAD_PROFILE_PIC_REQUEST = 'UPLOAD_PROFILE_PIC_REQUEST';

export const getPreferencesRequest = payload => {
    return {
        type: GET_PREFERENCES_REQUEST,
        payload
    }
}

export const updatePreferencesRequest = payload => {
    return {
        type: UPDATE_PREFERENCES_REQUEST,
        payload
    }
}

export const getOtherUserAddressRequest = payload => {
    return {
        type: GET_OTHER_USER_ADDRESS_REQUEST,
        payload
    }
}

export const getUserAvailabilityRequest = payload => {
    return {
        type: GET_USER_AVAILABILITY_REQUEST,
        payload
    }
}

export const getUserAvailabilitySuccess = payload => {
    return {
        type: GET_USER_AVAILABILITY_SUCCESS,
        payload
    }
}

export const updateUserAvailabilityRequest = payload => {
    return {
        type: UPDATE_USER_AVAILABILITY_REQUEST,
        payload
    }
}

export const getTypeAheadAddressRequest = payload => {
    return {
        type: GET_TYPE_AHEAD_ADDRESS_REQUEST,
        payload
    }
}

export const resetMovedCountRequest = payload => {
    return {
        type: RESET_MOVED_COUNT_REQUEST,
        payload
    }
}

export const getMovedCountRequest = payload => {
    return {
        type: GET_MOVED_COUNT_REQUEST,
        payload
    }
}

export const updateOnbStatusRequest = payload => {
    return {
        type: UPDATE_ONB_STATUS_REQUEST,
        payload
    }
}

export const updateUserNeighborhoodRequest = payload => {
    return {
        type: UPDATE_USER_NEIGHBORHOOD_REQUEST,
        payload
    }
}

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

export const updateUserDetailsRequest = payload => {
    return {
        type: UPDATE_USER_DETAILS_REQUEST,
        payload
    }
}

export const getHelpCategoriesRequest = payload => {
    return {
        type: GET_HELP_CATEGORIES_REQUEST,
        payload
    }
}

export const updateUserHelpCategoriesRequest = payload => {
    return {
        type: UPDATE_USER_HELP_CATEGORIES_REQUEST,
        payload
    }
}

export const getUserInterestsRequest = payload => {
    return {
        type: GET_USER_INTERESTS,
        payload
    }
}

export const updateUserInterestsRequest = payload => {
    return {
        type: UPDATE_USER_INTERESTS,
        payload
    }
}

export const getUserStatsData = payload => {
    return {
        type: GET_USER_STATS,
        payload
    }
}

export const uploadProfilePicRequest = payload => {
    return {
        type: UPLOAD_PROFILE_PIC_REQUEST,
        payload
    }
}

export const updateUserAddressRequest = payload => {
    return {
        type: UPDATE_USER_ADDRESS_REQUEST,
        payload
    }
}