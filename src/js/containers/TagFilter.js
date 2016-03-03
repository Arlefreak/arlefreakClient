import { connect } from 'react-redux';
import { addTagFilter, deleteTagFilter } from '../actions/actions';
import  TagList from '../components/tagList.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: tags
    } = apiCalls['tags'] || {
        isFetching: true,
        items: []
    };
    return {
        tags: tags,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTagClick: (id, name) => {
            dispatch(addTagFilter(id, name));
        }
    };
};

const TagFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);

export default TagFilter;
