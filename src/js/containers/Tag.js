import { connect } from 'react-redux';
import { addTagFilter, deleteTagFilter } from '../actions/actions';
import TagRow from '../components/tagRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    const { tag } = ownProps;
    let active = false;

    if(tagFilter){
        var i = 0;
        for(i; i < tagFilter.length; i++){
            if(tagFilter[i].id === tag.id){
                active = true;
            }
        }
    }
    return {
        tag,
        active
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { tag } = ownProps;
    return {
        onClick: () => {
            dispatch(addTagFilter(tag.id, tag.name));
        }
    };
};

const Tag = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagRow);

export default Tag;
