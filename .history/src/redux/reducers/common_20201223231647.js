import { REHYDRATE } from 'redux-persist';
import { UPDATE_SHOW_POPUP, START_LOADING, TOGGLE_SWIPE_VIEW, STOP_LOADING, RESET, UPDATE_PROFILE_SUCCESS, UPDATE_AUTH_TOKEN, UPDATE_INTERNET_STATUS, GET_USER_DETAILS_SUCCESS, GET_USER_AVAILABILITY_SUCCESS, GET_USER_STATS, GET_STREAM_LIST_REQUEST, GET_STREAM_LIST_SUCCESS, UPDATE_STREAM } from '../actions';

const initialState = {
    authToken: '',
    userData: {},
    loading: false,
    isAvailable: true,
    showWipeView: true,
    netConnected: true,
    isPopupShown: false,
    selectedStream: "1"
};

const CommonReducer = (state = { ...initialState }, action) => {
    switch (action.type) {

        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SHOW_POPUP:
            return {
                ...state,
                isPopupShown: action.payload
            }
        case UPDATE_STREAM:
            return {
                ...state,
                selectedStream: action.payload
            }
        case GET_USER_AVAILABILITY_SUCCESS:
            return {
                ...state,
                isAvailable: action.payload
            }
        case TOGGLE_SWIPE_VIEW:
            return {
                ...state,
                showWipeView: false,
            };
        case STOP_LOADING:
            return {
                ...state,
                loading: false,
            };
        case GET_USER_DETAILS_SUCCESS:
            console.log("userData", action.payload)
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            }
        case UPDATE_INTERNET_STATUS:
            return {
                ...state,
                netConnected: action.payload
            }
        case UPDATE_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            }
        case REHYDRATE:
            return {
                ...initialState,
                ...((action.payload || {}).common || {}),
                loading: false,
                netConnected: true
            };
        case RESET:
            return {
                ...initialState,
                netConnected: state.netConnected,
                showWipeView: state.showWipeView
            };
        default:
            return {
                ...state
            };
    }
};

export default CommonReducer;
