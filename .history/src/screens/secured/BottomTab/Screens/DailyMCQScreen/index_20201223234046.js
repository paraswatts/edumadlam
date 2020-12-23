import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { updateStream, updateShowPopup } from '../../../../../redux/actions'
const mapStateToProps = state => {
    return {
        streamList: state.important.streamList,
        isPopupShown: state.common.isPopupShown
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStream: (payload) => dispatch(updateStream(payload)),
        updateShowPopup: (payload) => dispatch(updateShowPopup(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)