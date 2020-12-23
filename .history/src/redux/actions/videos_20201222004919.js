
export const VIDEO_LIST_REQUEST = 'VIDEO_LIST_REQUEST';
export const VIDEO_LIST_SUCCESS = 'VIDEO_LIST_SUCCESS';

export const YOUTUBE_VIDEO_CATEGORY_REQUEST = 'YOUTUBE_VIDEO_CATEGORY_REQUEST';
export const YOUTUBE_VIDEO_CATEGORY_SUCCESS = 'YOUTUBE_VIDEO_CATEGORY_SUCCESS';
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

export const youtubeVideoCategoryListRequest = payload => {
    console.log("here", payload)
    return {
        type: YOUTUBE_VIDEO_CATEGORY_REQUEST,
        payload
    }
}

export const youtubeVideoCategoryListSuccess = payload => {
    return {
        type: YOUTUBE_VIDEO_CATEGORY_SUCCESS,
        payload
    }
}




