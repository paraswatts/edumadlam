import SignInScreen from './screen';
import { connect } from 'react-redux';
import { updateUserRequest } from '../../../redux/actions';
import { reset } from 'redux-form';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserRequest: payload => dispatch(updateUserRequest(payload)),
        resetForm: () => dispatch(reset('changePassword'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)