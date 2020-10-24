import { REHYDRATE } from 'redux-persist';
import { RESET, IMPORTANT_CAT_SUCCESS, IMPORTANT_SUB_CAT_SUCCESS, IMPORTANT_DETAIL_SUCCESS } from '../actions';

const initialState = {
    importantCategories: [],
    importantSubCategories: [],
    importantDetail: ''
};

const FriendsReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
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
