import TestQuestions from './screen';
import { connect } from 'react-redux';
import { testQuestionsRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testQuestionsRequest: (payload) => dispatch(testQuestionsRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestions)

