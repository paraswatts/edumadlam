import FriendsScreen from './screen';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        authToken: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)