import VideosScreen from './screen';
import { connect } from 'react-redux';
import { youtubeVideoCategoryListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        youtubeVideoCategoryListRequest: (payload) => dispatch(youtubeVideoCategoryListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen)