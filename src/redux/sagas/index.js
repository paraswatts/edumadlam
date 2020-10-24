import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ImportantSaga from './important';
import NewsSaga from './news';
import TaskSaga from './tasks';
import UserSaga from './user';

function* dataSaga() {
    yield all([
        fork(AuthSaga),
        fork(TaskSaga),
        fork(UserSaga),
        fork(ImportantSaga),
        fork(NewsSaga)
    ]);
}


export default dataSaga;
