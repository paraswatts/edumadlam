import DetailsScreen from './screen';
import { connect } from 'react-redux';
import { newsDetailRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsDetailRequest: (payload) => dispatch(newsDetailRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)

