import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ImportantSaga from './important';
import NewsSaga from './news';
import TestsSaga from './tests';
import UserSaga from './user';
import VideosSaga from './videos';
function* dataSaga() {
    yield all([
        fork(AuthSaga),
        fork(TestsSaga),
        fork(UserSaga),
        fork(ImportantSaga),
        fork(NewsSaga),
        fork(VideosSaga)
    ]);
}


export default dataSaga;
