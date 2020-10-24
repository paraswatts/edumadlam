import { combineReducers } from 'redux';
// import { reducer as FormReducer } from "redux-form";
import CommonReducer from './common';
import TasksReducer from './tasks';
import ImportantReducer from './important';
import NewsReducer from './news';
import { reducer as formReducer } from 'redux-form';

const RootReducer = combineReducers({
    common: CommonReducer,
    important: ImportantReducer,
    tasks: TasksReducer,
    NewsReducer,
    form: formReducer,
})

export default RootReducer;