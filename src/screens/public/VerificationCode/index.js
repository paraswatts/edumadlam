import VerificationCodeScreen from './screen';
import { connect } from 'react-redux';
import { requestOTP, phoneUpdateOtpRequest, phoneUpdateRequest, signinRequest } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        phoneUpdateOtpRequest: payload => dispatch(phoneUpdateOtpRequest(payload)),
        phoneUpdateRequest: payload => dispatch(phoneUpdateRequest(payload)),
        requestOTP: payload => dispatch(requestOTP(payload)),
        signinRequest: payload => dispatch(signinRequest(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCodeScreen)