import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { impSubCatListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        selectedStream: state.common.selectedStream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        impSubCatListRequest: (payload) => dispatch(impSubCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

