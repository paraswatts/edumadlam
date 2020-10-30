import SignupScreen from './screen';
import { connect } from 'react-redux';
import { signupRequest } from '../../../redux/actions';
import { reset } from 'redux-form';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: payload => dispatch(signupRequest(payload)),
        resetForm: () => dispatch(reset('signup'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)