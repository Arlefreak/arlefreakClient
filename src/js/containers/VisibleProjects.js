import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';
import { setVisibleProjects } from '../actions/actions.js';

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

   
    let filterProjects = visibleProjects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = items;
    }

    return {
        projects: filterProjects,
        isFetching,
        lastUpdated
    };
};

const VisibleProjects = connect(
    mapStateToProps
)(ProjectList);

export default VisibleProjects;
