import NewsSubCategory from './screen';
import { connect } from 'react-redux';
import { newsSubCatListRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsSubCatListRequest: (payload) => dispatch(newsSubCatListRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSubCategory)

