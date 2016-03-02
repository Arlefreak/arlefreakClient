import { connect } from 'react-redux';
import { addTagFilter, deleteTagFilter } from '../actions/actions';
import  TagList from '../components/tagList.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;
    // const {
    //     isFetching,
    //     lastUpdated,
    //     items: categories
    // } = apiCalls['projectsCategories'] || {
    //     isFetching: true,
    //     items: []
    // };
    return {
        tags: []
        // isFetching,
        // lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTagClick: (id, name) => {
            dispatch(AddTagFilter(id, name));
        }
    };
};

const TagFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);

export default TagFilter;
