import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions/actions';
import  Project from '../components/project.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.params;
    const { apiCalls } = state;
    const projects = apiCalls['projects'] || {
        isFetching: true,
        items: []
    };

    let project = {
        id: 0,
        name: '',
        description: '',
        tags: []
    };
    var i = 0;
    for(i; i < projects.items.length; i++){
        if (projects.items[i].id === parseInt(id)){
            project = projects.items[i];
            break;
        }
    }
    const links = apiCalls['projectsLinks/?project__id=' + id] || {
        isFetching: true,
        items: []
    };
    const images = apiCalls['projectsImages?imgType=gal&project__id=' + id] || {
        isFetching: true,
        items: []
    };
    const isFetching = projects.isFetching && images.isFetching && links.isFetching;
    return {
        isFetching: isFetching,
        project: project,
        links: links,
        images: images
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.params;
    dispatch(apiFetchIfNeeded('projects'));
    dispatch(apiFetchIfNeeded('projectsLinks/?project__id=' + id));
    dispatch(apiFetchIfNeeded('projectsImages?imgType=gal&project__id=' + id));
    return {
        onTagClick: (id) => { console.log(id); },
        onImageClick : () => { console.log('ImageClick'); }
    };
};

const ProjectV = connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);

export default ProjectV;
