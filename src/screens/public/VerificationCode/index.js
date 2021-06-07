import VerificationCodeScreen from './screen';
import { connect } from 'react-redux';
import { requestOTP, otpVerifyRequest } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        otpVerifyRequest: payload => dispatch(otpVerifyRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCodeScreen)