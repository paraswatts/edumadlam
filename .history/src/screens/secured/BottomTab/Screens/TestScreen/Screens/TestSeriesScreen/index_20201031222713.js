import TestSeriesList from './screen';
import { connect } from 'react-redux';
import { testCatListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testCatListRequest: (payload) => dispatch(testCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesList)

