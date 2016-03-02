import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';

const getVisibleProjects = (projects, category, tags) => {
    if(projects.length > 0){
        if(category.id === 0){
            return projects;
        }else{
            return projects.filter(t => t.category === category.id);
        }
    }else{
        return [];
    }
};

const mapStateToProps = (state) => {
    const { apiCalls, categoryFilter, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: projects
    } = apiCalls['projects'] || {
        isFetching: true,
        items: []
    };
    return {
        projects: getVisibleProjects(
            projects,
            categoryFilter,
            tagFilter
        ),
        isFetching,
        lastUpdated
    };
};

const VisibleProjects = connect(
    mapStateToProps
)(ProjectList);

export default VisibleProjects;
