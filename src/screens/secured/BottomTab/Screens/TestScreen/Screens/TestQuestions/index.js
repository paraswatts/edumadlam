import TestQuestions from './screen';
import { connect } from 'react-redux';
import { testQuestionsRequest, testSubmitRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testQuestionsRequest: (payload) => dispatch(testQuestionsRequest(payload)),
        testSubmitRequest: (payload) => dispatch(testSubmitRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestions)

