import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { getUserPurchaseHistoryRequest, stopLoading } from '../../../../../redux/actions'
const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserPurchaseHistoryRequest: (payload) => dispatch(getUserPurchaseHistoryRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)