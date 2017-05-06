import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions/category_filter_actions';
import { apiFetchIfNeeded } from '../actions/api_actions';
import  Single from '../components/single__container.jsx';

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { apiCalls } = state;
    const list = apiCalls['portfolio/projects'] || {
        isFetching: true,
        items: []
    };

    let item = {
        id: 0,
        name: '',
        description: '',
        tags: [],
    };

    var i = 0;
    for(i; i < list.items.length; i++){
        if (list.items[i].id === parseInt(id)){
            item = list.items[i];
            break;
        }
    }

    const links = apiCalls['portfolio/projectsLinks/?project__id=' + id] || {
        isFetching: true,
        items: []
    };

    const images = apiCalls['portfolio/projectsImages/?imgType=gal&project__id=' + id] || {
        isFetching: true,
        items: []
    };

    const tags =  item.tags || [];
    console.log(tags);

    const isFetching = list.isFetching && images.isFetching && links.isFetching && tags.apiCalls;

    return {
        id: 'p',
        title: item.name,
        isFetching: false,
        item: item,
        links: links.items,
        images: images.items,
        tags: tags,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { id } = ownProps.match.params || 0;
    dispatch(apiFetchIfNeeded('portfolio/projects'));
    dispatch(apiFetchIfNeeded('portfolio/projectsLinks/?project__id=' + id));
    dispatch(apiFetchIfNeeded('portfolio/projectsImages?imgType=gal&project__id=' + id));
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onTagClick: (id) => { console.log(id); },
        onImageClick : () => { console.log('ImageClick'); }
    };
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);

export default Project;
