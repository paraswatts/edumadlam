import FriendsScreen from './screen';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        streamList: state.important.streamList,
        isPopupShown: state.common.isPopupShown
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)