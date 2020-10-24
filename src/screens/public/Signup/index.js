import SignupScreen from './screen';
import { connect } from 'react-redux';
import { signupRequest } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: payload => dispatch(signupRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)