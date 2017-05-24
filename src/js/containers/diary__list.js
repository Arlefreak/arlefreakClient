import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['diary/posts'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['diary/postTags'] || {
        isFetching: true,
        items: []
    };

    let filterItems = visibleItems;

    if(visibleItems.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterItems = items;
    }

    return {
        id: 'logs',
        isFetching: isFetching && tags.isFetching,
        items: filterItems,
        tags: tags,
        route: 'logs'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('diary/posts'));
    dispatch(apiFetchIfNeeded('diary/postTags'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;
