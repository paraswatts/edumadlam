import PurchasedTestSeriesList from './screen';
import { connect } from 'react-redux';
import { purchasedTestSeriesListRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
        sId: state.common.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchasedTestSeriesListRequest: (payload) => dispatch(purchasedTestSeriesListRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedTestSeriesList)

