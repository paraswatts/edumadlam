import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { updateStream } from '../../../../../redux'
const mapStateToProps = state => {
    return {
        streamList: state.important.streamList,
        isPopupShown: state.common.isPopupShown
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStream: (payload) => dispatch(updateStream())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)