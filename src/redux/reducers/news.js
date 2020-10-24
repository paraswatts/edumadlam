import { REHYDRATE } from 'redux-persist';
import { RESET, NEWS_CAT_SUCCESS, NEWS_SUB_CAT_SUCCESS, NEWS_DETAIL_SUCCESS } from '../actions';

const initialState = {
    newsCategories: [],
    newsSubCategories: [],
    newsDetail: ''
};

const NewsReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case NEWS_CAT_SUCCESS:
            return {
                ...state,
                newsCategories: action.payload
            }

        case NEWS_SUB_CAT_SUCCESS:
            return {
                ...state,
                newsSubCategories: action.payload
            }
        case NEWS_DETAIL_SUCCESS:
            return {
                ...state,
                newsDetail: action.payload
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

export default NewsReducer;
