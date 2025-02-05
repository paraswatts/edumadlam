export const RESET = 'RESET';
export const SEND_EMAIL_TO_VERIFY = 'SEND_EMAIL_TO_VERIFY'
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const TOGGLE_SWIPE_VIEW = 'TOGGLE_SWIPE_VIEW';
export const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
export const UPDATE_INTERNET_STATUS = 'UPDATE_INTERNET_STATUS';
export const startLoading = () => {
    return {
        type: START_LOADING
    }
}

export const toggleSwipeView = () => {
    return {
        type: TOGGLE_SWIPE_VIEW
    }
}

export const stopLoading = () => {
    return {
        type: STOP_LOADING
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

export const updateInternetStatus = (payload) => {
    return {
        type: UPDATE_INTERNET_STATUS,
        payload
    }
}

export const updateAuthTokenRedux = (payload) => {
    return {
        type: UPDATE_AUTH_TOKEN,
        payload
    }
}

export const sendEmailToVerify = (payload) => {
    return {
        type: SEND_EMAIL_TO_VERIFY,
        payload
    }
}