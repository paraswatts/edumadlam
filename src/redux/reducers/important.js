import { REHYDRATE } from 'redux-persist';
import { GET_STREAM_LIST_SUCCESS, RESET, IMPORTANT_CAT_SUCCESS, IMPORTANT_SUB_CAT_SUCCESS, IMPORTANT_DETAIL_SUCCESS, IMPORTANT_CHAPTER_SUCCESS } from '../actions';

const initialState = {
    importantCategories: [],
    importantSubCategories: [],
    importantDetail: '',
    importantChapters: [],
    streamList: []
};

const FriendsReducer = (state = { ...initialState }, action) => {
    switch (action.type) {

        case GET_STREAM_LIST_SUCCESS:
            return {
                ...state,
                streamList: action.payload
            }
        case IMPORTANT_CAT_SUCCESS:
            return {
                ...state,
                importantCategories: action.payload
            }

        case IMPORTANT_SUB_CAT_SUCCESS:
            return {
                ...state,
                importantSubCategories: action.payload
            }
        case IMPORTANT_DETAIL_SUCCESS:
            return {
                ...state,
                importantDetail: action.payload
            }
        case IMPORTANT_CHAPTER_SUCCESS:
            return {
                ...state,
                importantChapters: action.payload
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

export default FriendsReducer;
