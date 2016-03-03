import { connect } from 'react-redux';
import { clearTagFilter } from '../actions/actions';
import TagRow from '../components/clearAllTagsRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    let active = false;

    if(!tagFilter){
        active = true;
    }else if(tagFilter.length === 0){
        active = true;
    }
    return {
        active
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { tag } = ownProps;
    return {
        onClick: () => {
            dispatch(clearTagFilter());
        }
    };
};

const Tag = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRow);

export default Tag;
