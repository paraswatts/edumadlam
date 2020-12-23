import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { newsCatListRequest } from '../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsCatListRequest: (payload) => dispatch(newsCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

