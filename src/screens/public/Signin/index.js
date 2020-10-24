import SignInScreen from './screen';
import { connect } from 'react-redux';
import { signinRequest } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinRequest: payload => dispatch(signinRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)