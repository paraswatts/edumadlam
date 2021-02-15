import VideosScreen from './screen';
import { connect } from 'react-redux';
import { youtubeVideoCategoryListRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        youtubeVideoCategoryListRequest: (payload) => dispatch(youtubeVideoCategoryListRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen)