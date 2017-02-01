import { connect } from 'react-redux';
import  TagList from '../components/tagList.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;
    const {
        isFetching,
        lastUpdated,
        items: tags
    } = apiCalls['portfolio/projectTags'] || {
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
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onTagClick: (id, tag) => {
            dispatch(addTagFilter(id, tag));
        }
    };
};

const TagFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(TagList);

export default TagFilter;
