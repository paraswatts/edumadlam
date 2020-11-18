import QuizScreen from './screen';
import { connect } from 'react-redux';

import { dailyQuizRequest, testSubmitRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dailyQuizRequest: (payload) => dispatch(dailyQuizRequest(payload)),
        testSubmitRequest: (payload) => dispatch(testSubmitRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)