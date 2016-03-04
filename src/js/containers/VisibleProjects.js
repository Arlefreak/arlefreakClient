import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';
import { setVisibleProjects } from '../actions/actions.js';

const getVisibleProjects  = (items, projects) => {
    if(items.length > 0){
        var i = 0;
        var j = 0;
        var filteredImages = [];
        for(i; i < items.length; i++){
            j = 0;
            for(j; j < projects.length; j++){
                if(items[i].id === projects[j].id ){
                    filteredImages.push(items[i]);
                }
            } 
        }
        return filteredImages;
    }else{
        return items;
    }
};

const mapStateToProps = (state) => {
    const { apiCalls, visibleProjects, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['projects'] || {
        isFetching: true,
        items: []
    };

    const filterProjects = getVisibleProjects(items, visibleProjects);

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
