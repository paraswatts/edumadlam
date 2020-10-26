
export const IMPORTANT_CAT_REQUEST = 'IMPORTANT_CAT_REQUEST';
export const IMPORTANT_CAT_SUCCESS = 'IMPORTANT_CAT_SUCCESS';
export const IMPORTANT_SUB_CAT_REQUEST = 'IMPORTANT_SUB_CAT_REQUEST';
export const IMPORTANT_SUB_CAT_SUCCESS = 'IMPORTANT_SUB_CAT_SUCCESS';
export const IMPORTANT_DETAIL_REQUEST = 'IMPORTANT_DETAIL_REQUEST';
export const IMPORTANT_DETAIL_SUCCESS = 'IMPORTANT_DETAIL_SUCCESS';
export const GET_STREAM_LIST_REQUEST = 'GET_STREAM_LIST_REQUEST';
export const GET_STREAM_LIST_SUCCESS = 'GET_STREAM_LIST_SUCCESS';
export const importantCatListRequest = payload => {
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

export const streamRequest = payload => {
    console.log("payload", payload)
    return {
        type: GET_STREAM_LIST_REQUEST,
        payload
    }
}

export const streamSucess = payload => {
    return {
        type: GET_STREAM_LIST_SUCCESS,
        payload
    }
}





