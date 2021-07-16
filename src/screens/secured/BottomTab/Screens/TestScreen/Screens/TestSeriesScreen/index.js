import TestSeriesList from './screen';
import { connect } from 'react-redux';
import { verifyPromo, startLoading, testCatListRequest, generatePaymentLinkRequest, stopLoading, completeStorePayment } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
        selectedStream: state.common.selectedStream,
        authToken: state.common.authToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testCatListRequest: (payload) => dispatch(testCatListRequest(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload)),
        completeStorePayment: (payload) => dispatch(completeStorePayment(payload)),
        stopLoading: () => dispatch(stopLoading()),
        startLoading: () => dispatch(startLoading()),
        verifyPromo: (payload) => dispatch(verifyPromo(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesList)

