import { connect } from 'react-redux';
import ListCointainer from '../components/list__container.jsx';
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state) => {
    const { apiCalls, visibleProjects, tagFilter, categoryFilter } = state;
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

    let filterProjects = visibleProjects;

    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = items;
    }

    let finalFetch = isFetching &&
        tags.isFetching &&
        categories.isFetching &&
        images.isFetching;

    return {
        id: 'p',
        isFetching: finalFetch,
        items: filterProjects,
        categories: categories,
        tags: tags,
        images: images,
        route: 'projects'
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
