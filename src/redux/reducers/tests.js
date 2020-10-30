import { REHYDRATE } from 'redux-persist';
import { RESET, TEST_CAT_SUCCESS, TEST_SERIES_LIST_SUCCESS, PURCHASED_TEST_SERIES_LIST_SUCCESS } from '../actions';

const initialState = {
    testCategories: [],
    testSeriesList: [],
    purchasedTestSeriesList: []
};

const TestReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case TEST_CAT_SUCCESS:
            return {
                ...state,
                testCategories: action.payload
            }

        case TEST_SERIES_LIST_SUCCESS:
            return {
                ...state,
                testSeriesList: action.payload
            }
        case PURCHASED_TEST_SERIES_LIST_SUCCESS:
            return {
                ...state,
                purchasedTestSeriesList: action.payload
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

export default TestReducer;
