
export const IMPORTANT_CAT_REQUEST = 'IMPORTANT_CAT_REQUEST';
export const IMPORTANT_CAT_SUCCESS = 'IMPORTANT_CAT_SUCCESS';

export const IMPORTANT_SUB_CAT_REQUEST = 'IMPORTANT_SUB_CAT_REQUEST';
export const IMPORTANT_SUB_CAT_SUCCESS = 'IMPORTANT_SUB_CAT_SUCCESS';

export const IMPORTANT_DETAIL_REQUEST = 'IMPORTANT_DETAIL_REQUEST';
export const IMPORTANT_DETAIL_SUCCESS = 'IMPORTANT_DETAIL_SUCCESS';
export const importantCatListRequest = payload => {
    console.log("here", payload)
    return {
        type: IMPORTANT_CAT_REQUEST,
        payload
    }
}

export const importantCatListSuccess = payload => {
    return {
        type: IMPORTANT_CAT_SUCCESS,
        payload
    }
}

export const importantSubCatListRequest = payload => {
    console.log("here", payload)
    return {
        type: IMPORTANT_SUB_CAT_REQUEST,
        payload
    }
}

export const importantSubCatListSuccess = payload => {
    return {
        type: IMPORTANT_SUB_CAT_SUCCESS,
        payload
    }
}



export const importantDetailRequest = payload => {
    console.log("here", payload)
    return {
        type: IMPORTANT_DETAIL_REQUEST,
        payload
    }
}

export const importantDetailSuccess = payload => {
    return {
        type: IMPORTANT_DETAIL_SUCCESS,
        payload
    }
}


