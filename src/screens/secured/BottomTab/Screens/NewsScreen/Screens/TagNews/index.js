import TagNews from './screen';
import { connect } from 'react-redux';
import { newsSubCatListRequest, stopLoading, tagSearchRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newsSubCatListRequest: (payload) => dispatch(newsSubCatListRequest(payload)),
        tagSearchRequest: (payload) => dispatch(tagSearchRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagNews)

