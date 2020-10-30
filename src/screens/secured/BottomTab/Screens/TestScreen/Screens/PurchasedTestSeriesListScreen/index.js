import PurchasedTestSeriesList from './screen';
import { connect } from 'react-redux';
import { purchasedTestSeriesListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchasedTestSeriesListRequest: (payload) => dispatch(purchasedTestSeriesListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedTestSeriesList)

