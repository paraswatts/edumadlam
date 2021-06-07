export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const USER_PROFILE = 'USER_PROFILE';
export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const LOGIN_VERIY_REQUEST = "LOGIN_VERIY_REQUEST";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const OTP_VERIFY_REQUEST = "OTP_VERIFY_REQUEST";
export const OTP_VERIFY_SUCCESS = 'OTP_VERIFY_SUCCESS';
export const signinRequest = payload => {
    return {
        type: SIGNIN_REQUEST,
        payload
    }
}

export const loginVerifyRequest = payload => {
    return {
        type: LOGIN_VERIY_REQUEST,
        payload
    }
}

export const otpVerifyRequest = payload => {
    return {
        type: OTP_VERIFY_REQUEST,
        payload
    }
}

export const updateUserRequest = payload => {
    return {
        type: UPDATE_USER_REQUEST,
        payload
    }
}

export const updateUserSuccess = payload => {
    return {
        type: UPDATE_USER_SUCCESS,
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

export const forgetPasswordRequest = payload => {
    return {
        type: FORGET_PASSWORD_REQUEST,
        payload
    }
}
