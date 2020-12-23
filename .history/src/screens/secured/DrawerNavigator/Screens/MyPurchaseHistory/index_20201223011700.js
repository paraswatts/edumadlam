import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { getUserPurchaseHistoryRequest } from '../../../../../redux/actions'
const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserPurchaseHistoryRequest: (payload) => dispatch(getUserPurchaseHistoryRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)