import FriendsScreen from './screen';
import { connect } from 'react-redux';
import { updateUserRequest, getUserDetailsRequest } from '../../../../../redux/actions';

const mapStateToProps = state => {
    let userData = state.common.userData;
    return {
        userData: userData,
        sId: state.common.authToken,
        initialValues: {
            name: userData._name,
            email: userData._email,
            mobile: userData._mobile
        },
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetForm: () => dispatch(reset('updateProfile')),
        updateUserRequest: (payload) => dispatch(updateUserRequest(payload)),
        getUserDetailsRequest: (payload) => dispatch(getUserDetailsRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)