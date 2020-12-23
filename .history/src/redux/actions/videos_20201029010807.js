
export const VIDEO_LIST_REQUEST = 'VIDEO_LIST_REQUEST';
export const VIDEO_LIST_SUCCESS = 'VIDEO_LIST_SUCCESS';
export const videoListRequest = payload => {
    console.log("here", payload)
    return {
        type: VIDEO_LIST_REQUEST,
        payload
    }
}

export const videoListSuccess = payload => {
    return {
        type: VIDEO_LIST_SUCCESS,
        payload
    }
}




