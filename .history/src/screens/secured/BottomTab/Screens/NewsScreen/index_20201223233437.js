import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { newsCatListRequest } from '../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        selectedStream: state.common.selectedStream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsCatListRequest: (payload) => dispatch(newsCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

