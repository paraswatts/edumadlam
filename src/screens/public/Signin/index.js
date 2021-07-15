import SignInScreen from './screen';
import { connect } from 'react-redux';
import { signinRequest, forgetPasswordRequest } from '../../../redux/actions';
import { reset } from 'redux-form';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signinRequest: payload => dispatch(signinRequest(payload)),
        forgetPasswordRequest: payload => dispatch(forgetPasswordRequest(payload)),
        resetForm: () => dispatch(reset('login'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)