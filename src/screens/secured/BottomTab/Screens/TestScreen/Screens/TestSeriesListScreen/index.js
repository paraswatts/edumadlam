import TestSeriesList from './screen';
import { connect } from 'react-redux';
import { verifyPromo, startLoading, testSeriesListRequest, generatePaymentLinkRequest, stopLoading, completeStorePayment } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        testSeriesListRequest: (payload) => dispatch(testSeriesListRequest(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload)),
        completeStorePayment: (payload) => dispatch(completeStorePayment(payload)),
        stopLoading: () => dispatch(stopLoading()),
        startLoading: () => dispatch(startLoading()),
        verifyPromo: (payload) => dispatch(verifyPromo(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesList)

