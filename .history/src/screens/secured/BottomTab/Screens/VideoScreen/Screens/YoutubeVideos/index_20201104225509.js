import VideosScreen from './screen';
import { connect } from 'react-redux';
import { videoListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        videoListRequest: (payload) => dispatch(videoListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosScreen)