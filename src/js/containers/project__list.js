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

    // TODO:  Grab categories & tags from state
    // const {
    //     isFetching,
    //     lastUpdated,
    //     items: items
    // } = apiCalls['portfolio/projectTags'] || {
    //     isFetching: true,
    //     items: []
    // };

    // const {
    //     isFetching,
    //     lastUpdated,
    //     items: items
    // } = apiCalls['portfolio/projectCategories'] || {
    //     isFetching: true,
    //     items: []
    // };

    let filterProjects = visibleProjects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = items;
    }

    return {
        id: 'p',
        isFetching,
        items: filterProjects,
        categories: filterProjects,
        tags: filterProjects,
        images: filterProjects,
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
