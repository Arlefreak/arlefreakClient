import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            console.log(true);
            return true;
        }
    }
    return false;
}

const filterByCategory  = (projects, category) => {
    if(projects.length > 0){
        if(category.id === 0){
            return projects;
        }else{
            return projects.filter(t => t.category === category.id);
        }
    }
};

const filterByTags = (projects, tags) => {
    var filteredProjects = [];
    var i = 0;
    var j = 0;
    var k = 0;
    var project;
    if(projects.length > 0 && tags.length > 0){
        for(i; i < projects.length; i++){
            project = projects[i];
            j = 0;
            if(project){
                for(j; j < project.tags.length; j++){
                    var b = false;
                    k = 0;
                    for(k; k < tags.length; k++){
                        if(project.tags[j].id === tags[k].id){
                            filteredProjects.push(project);
                            b = true;
                            break;
                        }
                    }
                    if(b){
                        break;
                    }
                }
            }
        }
    }else{
        filteredProjects = projects;
    }
    return filteredProjects;
};

const mapStateToProps = (state) => {
    const { apiCalls, categoryFilter, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['projects'] || {
        isFetching: true,
        items: []
    };

    const projectsByCat = filterByCategory(items, categoryFilter);
    const projectsByTag = filterByTags(projectsByCat, tagFilter);

    return {
        projects: projectsByTag,
        isFetching,
        lastUpdated
    };
};

const VisibleProjects = connect(
    mapStateToProps
)(ProjectList);

export default VisibleProjects;
