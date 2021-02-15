import ImportantSubCategory from './screen';
import { connect } from 'react-redux';
import { importantSubCatListRequest, stopLoading } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantSubCatListRequest: (payload) => dispatch(importantSubCatListRequest(payload)),
        stopLoading: () => dispatch(stopLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantSubCategory)

