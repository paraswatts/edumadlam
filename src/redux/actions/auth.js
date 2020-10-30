export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const USER_PROFILE = 'USER_PROFILE';

export const signinRequest = payload => {
    console.log("payload", payload)
    return {
        type: SIGNIN_REQUEST,
        payload
    }
}

export const signupRequest = payload => {
    return {
        type: SIGNUP_REQUEST,
        payload
    }
}

export const logoutRequest = payload => {
    return {
        type: LOGOUT_REQUEST,
        payload
    }
}
export const userProfile = payload => {
    return {
        type: USER_PROFILE,
        payload
    }
}