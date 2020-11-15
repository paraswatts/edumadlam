import QuizScreen from './screen';
import { connect } from 'react-redux';

import { dailyQuizRequest, testSeriesListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dailyQuizRequest: (payload) => dispatch(dailyQuizRequest(payload)),
        testSeriesListRequest: (payload) => dispatch(testSeriesListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)