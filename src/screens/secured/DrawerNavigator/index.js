import Drawer from './screen';
import { connect } from 'react-redux';
import { } from '../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)