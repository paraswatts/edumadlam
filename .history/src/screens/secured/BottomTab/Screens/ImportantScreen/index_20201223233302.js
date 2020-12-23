import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { importantCatListRequest } from '../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        selectedStream: state.common.selectedStream
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantCatListRequest: (payload) => dispatch(importantCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

