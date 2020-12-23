import FriendsScreen from './screen';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userData: state.common.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)