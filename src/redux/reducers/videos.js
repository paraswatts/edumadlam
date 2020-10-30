import { REHYDRATE } from 'redux-persist';
import { RESET, VIDEO_LIST_SUCCESS } from '../actions';

const initialState = {
    videoList: []
};

const VideosReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case VIDEO_LIST_SUCCESS:
            return {
                ...state,
                videoList: action.payload
            }

        case REHYDRATE:
            return {
                ...initialState,
                ...((action.payload || {}).friends || {}),
            };
        case RESET:
            return {
                ...initialState,
            };
        default:
            return {
                ...state
            };
    }
};

export default VideosReducer;
