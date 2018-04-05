import { connect } from 'react-redux';
import ListCointainer from '../../components/list__container';
import { apiFetchIfNeeded } from '../../actions/api_actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleItems, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projects'] || {
        isFetching: true,
        items: []
    };

    const tags = apiCalls['portfolio/projectTags'] || {
        isFetching: true,
        items: []
    };

    const categories = apiCalls['portfolio/projectsCategories'] || {
        isFetching: true,
        items: []
    };

    const images = apiCalls['portfolio/projectsImages/?imgType=mni'] || {
        isFetching: true,
        items: []
    };

    let filterItems = visibleItems;

    if(visibleItems.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterItems = items;
    }

    let finalFetch = isFetching &&
        tags.isFetching &&
        categories.isFetching &&
        images.isFetching;


    const meta_title = 'Portfolio';

    return {
        id: 'portfolio',
        isFetching: finalFetch,
        items: filterItems,
        categories: categories,
        tags: tags,
        images: images,
        route: 'portfolio',
        meta_title,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages/?imgType=mni'));
    return {};
};

const projectsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCointainer);

export default projectsPage;
