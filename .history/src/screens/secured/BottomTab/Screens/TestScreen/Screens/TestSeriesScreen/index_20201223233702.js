import TestSeriesList from './screen';
import { connect } from 'react-redux';
import { testCatListRequest, generatePaymentLinkRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
        selectedStream: state.common.selectedStream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testCatListRequest: (payload) => dispatch(testCatListRequest(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesList)

