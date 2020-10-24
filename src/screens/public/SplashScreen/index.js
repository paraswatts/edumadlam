import SplashScreen from './screen';
import { connect } from 'react-redux';
import { updateInternetStatus, getUserONBStepsRequest, } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        authToken: state.common.authToken,
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateInternetStatus: payload => dispatch(updateInternetStatus(payload)),
        getUserONBStepsRequest: payload => dispatch(getUserONBStepsRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)