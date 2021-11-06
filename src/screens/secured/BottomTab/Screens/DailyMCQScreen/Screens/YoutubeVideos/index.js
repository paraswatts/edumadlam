import VideosScreen from './screen';
import { connect } from 'react-redux';
import { videoListRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        videoListRequest: (payload) => dispatch(videoListRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen)