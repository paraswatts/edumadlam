
export const TEST_CAT_REQUEST = 'TEST_CAT_REQUEST';
export const TEST_CAT_SUCCESS = 'TEST_CAT_SUCCESS';

export const TEST_SERIES_LIST_REQUEST = 'TEST_SERIES_LIST_REQUEST';
export const TEST_SERIES_LIST_SUCCESS = 'TEST_SERIES_LIST_SUCCESS';


export const PURCHASED_TEST_SERIES_LIST_REQUEST = 'PURCHASED_TEST_SERIES_LIST_REQUEST';
export const PURCHASED_TEST_SERIES_LIST_SUCCESS = 'PURCHASED_TEST_SERIES_LIST_SUCCESS';


export const TEST_QUESTIONS_REQUEST = 'TEST_QUESTIONS_REQUEST';
export const TEST_QUESTIONS_SUCCESS = 'TEST_QUESTIONS_SUCCESS';

export const TEST_LIST_REQUEST = 'TEST_LIST_REQUEST';
export const TEST_LIST_SUCCESS = 'TEST_LIST_SUCCESS';
export const testCatListRequest = payload => {
    console.log("here", payload)
    return {
        type: TEST_CAT_REQUEST,
        payload
    }
}

export const testCatListSuccess = payload => {
    return {
        type: TEST_CAT_SUCCESS,
        payload
    }
}

export const testSeriesListRequest = payload => {
    console.log("testSeriesListRequest", payload)
    return {
        type: TEST_SERIES_LIST_REQUEST,
        payload
    }
}

export const testSeriesListSuccess = payload => {
    return {
        type: TEST_SERIES_LIST_SUCCESS,
        payload
    }
}

export const purchasedTestSeriesListRequest = payload => {
    console.log("here", payload)
    return {
        type: PURCHASED_TEST_SERIES_LIST_REQUEST,
        payload
    }
}

export const purchasedTestSeriesListSuccess = payload => {
    return {
        type: PURCHASED_TEST_SERIES_LIST_SUCCESS,
        payload
    }
}


export const testQuestionsRequest = payload => {
    console.log("testRequest", payload)
    return {
        type: TEST_QUESTIONS_REQUEST,
        payload
    }
}

export const testQuestionsSuccess = payload => {
    return {
        type: TEST_QUESTIONS_SUCCESS,
        payload
    }
}


export const testListRequest = payload => {
    console.log("testRequest", payload)
    return {
        type: TEST_LIST_REQUEST,
        payload
    }
}

export const testListSuccess = payload => {
    return {
        type: TEST_LIST_SUCCESS,
        payload
    }
}




