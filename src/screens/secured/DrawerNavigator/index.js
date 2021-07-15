import Drawer from './screen';
import { connect } from 'react-redux';
import { getUserDetailsRequest, logoutRequest, loginVerifyRequest } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken,
        userData: state.common.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {

        getUserDetailsRequest: payload => dispatch(getUserDetailsRequest(payload)),
        loginVerifyRequest: payload => dispatch(loginVerifyRequest(payload)),
        logoutRequest: (payload) => dispatch(logoutRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)