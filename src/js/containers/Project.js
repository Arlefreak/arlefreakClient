import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions/actions';
import  Project from '../components/project.jsx';;
import { apiFetchIfNeeded } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    console.table(ownProps.match);
    const { apiCalls } = state;
    const projects = apiCalls['portfolio/projects'] || {
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
    const links = apiCalls['portfolio/projectsLinks/?project__id=' + id] || {
        isFetching: true,
        items: []
    };
    const images = apiCalls['portfolio/projectsImages?imgType=gal&project__id=' + id] || {
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
    const { id } = ownProps.match.params || 0;
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsLinks/?project__id=' + id));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages?imgType=gal&project__id=' + id));
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
