import SignInScreen from './screen';
import { connect } from 'react-redux';
import { forgetPasswordRequest } from '../../../redux/actions';
import { reset } from 'redux-form';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forgetPasswordRequest: payload => dispatch(forgetPasswordRequest(payload)),
        resetForm: () => dispatch(reset('forgetPassword'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)