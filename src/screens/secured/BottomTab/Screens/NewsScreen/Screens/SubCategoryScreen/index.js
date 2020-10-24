import NewsSubCategory from './screen';
import { connect } from 'react-redux';
import { newsSubCatListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsSubCatListRequest: (payload) => dispatch(newsSubCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSubCategory)

