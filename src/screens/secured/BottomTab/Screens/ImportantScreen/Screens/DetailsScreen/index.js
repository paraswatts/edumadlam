import DetailsScreen from './screen';
import { connect } from 'react-redux';
import { importantDetailRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantDetailRequest: (payload) => dispatch(importantDetailRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)

