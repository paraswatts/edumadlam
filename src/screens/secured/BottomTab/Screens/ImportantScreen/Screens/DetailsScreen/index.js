import DetailsScreen from './screen';
import { connect } from 'react-redux';
import { importantDetailRequest, stopLoading, completeStorePayment, generatePaymentLinkRequest, startLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantDetailRequest: (payload) => dispatch(importantDetailRequest(payload)),
        stopLoading: () => dispatch(stopLoading()),
        completeStorePayment: (payload) => dispatch(completeStorePayment(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload)),
        startLoading: () => dispatch(startLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)

