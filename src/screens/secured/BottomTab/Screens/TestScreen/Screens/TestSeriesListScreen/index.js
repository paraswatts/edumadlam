import TestSeriesList from './screen';
import { connect } from 'react-redux';
import { testSeriesListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testSeriesListRequest: (payload) => dispatch(testSeriesListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesList)

