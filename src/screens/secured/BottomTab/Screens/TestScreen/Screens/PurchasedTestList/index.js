import TestList from './screen';
import { connect } from 'react-redux';
import { testListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testListRequest: (payload) => dispatch(testListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestList)

