import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import ListCointainer from '../components/list__container.jsx';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['ligoj/link'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['ligoj/linkTags'] || {
        isFetching: true,
        items: []
    };

    let filterItems = visibleItems;

    if(visibleItems.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterItems = items;
    }

    return {
        id: 'ligoj',
        isFetching: isFetching && tags.isFetching,
        items: filterItems,
        tags: tags,
        route: 'ligoj'
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('ligoj/link'));
    dispatch(apiFetchIfNeeded('ligoj/linkTags'));
    return {};
};

const diaryPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default diaryPage;
