import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { importantChapterListRequest, completeStorePayment, generatePaymentLinkRequest, startLoading, stopLoading, verifyPromo } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        selectedStream: state.common.selectedStream,
        sId: state.common.authToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantChapterListRequest: (payload) => dispatch(importantChapterListRequest(payload)),
        completeStorePayment: (payload) => dispatch(completeStorePayment(payload)),
        generatePaymentLinkRequest: (payload) => dispatch(generatePaymentLinkRequest(payload)),
        verifyPromo: (payload) => dispatch(verifyPromo(payload)),
        stopLoading: () => dispatch(stopLoading()),
        startLoading: () => dispatch(startLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

