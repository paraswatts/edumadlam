import { combineReducers } from 'redux';
// import { reducer as FormReducer } from "redux-form";
import CommonReducer from './common';
import TestsReducer from './tests';
import ImportantReducer from './important';
import NewsReducer from './news';
import VideosReducer from './videos';

import { reducer as formReducer } from 'redux-form';

const RootReducer = combineReducers({
    common: CommonReducer,
    important: ImportantReducer,
    tests: TestsReducer,
    news: NewsReducer,
    videos: VideosReducer,
    form: formReducer,
})

export default RootReducer;