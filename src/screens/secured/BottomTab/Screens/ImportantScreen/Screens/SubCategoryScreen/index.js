import ImportantSubCategory from './screen';
import { connect } from 'react-redux';
import { importantSubCatListRequest } from '../../../../../../../redux/actions';

const mapStateToProps = state => {
    return {
        netConnected: state.common.netConnected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        importantSubCatListRequest: (payload) => dispatch(importantSubCatListRequest(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantSubCategory)

