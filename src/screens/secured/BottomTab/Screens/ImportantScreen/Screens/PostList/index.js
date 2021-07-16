import ImportantSubCategory from './screen';
import { connect } from 'react-redux';
import { verifyPromo, importantSubCatListRequest, stopLoading, startLoading, generatePaymentLinkRequest, completeStorePayment } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantSubCatListRequest: (payload) => dispatch(importantSubCatListRequest(payload)),
        completeStorePayment: (payload) => dispatch(completeStorePayment(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload)),
        stopLoading: () => dispatch(stopLoading()),
        startLoading: () => dispatch(startLoading()),
        verifyPromo: (payload) => dispatch(verifyPromo(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantSubCategory)

