import DetailsScreen from './screen';
import { connect } from 'react-redux';
import { newsDetailRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsDetailRequest: (payload) => dispatch(newsDetailRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)

