import TestQuestions from './screen';
import { connect } from 'react-redux';
import { testQuestionsRequest, testSeriesListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testQuestionsRequest: (payload) => dispatch(testQuestionsRequest(payload)),
        testSeriesListRequest: (payload) => dispatch(testSeriesListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestQuestions)

