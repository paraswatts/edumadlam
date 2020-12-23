import QuizScreen from './screen';
import { connect } from 'react-redux';

import { dailyQuizRequest, dailyQuizSubmitRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dailyQuizRequest: (payload) => dispatch(dailyQuizRequest(payload)),
        testSubmitRequest: (payload) => dispatch(dailyQuizSubmitRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen)