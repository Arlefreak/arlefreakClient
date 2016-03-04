import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/actions';
import  ImageList from '../components/imageList.jsx';;

const getVisibleImages  = (items, projects) => {
    if(items.length > 0){
        var i = 0;
        var j = 0;
        var filteredImages = [];
        for(i; i < items.length; i++){
            j = 0;
            for(j; j < projects.length; j++){
                if(items[i].project === projects[j].id ){
                    filteredImages.push(items[i]);
                }
            } 
        }
        return filteredImages;
    }else{
        return items;
    }
};

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, visibleProjects, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['images'] || {
        isFetching: true,
        items: []
    };
    
    const {
        items: projects
    } = apiCalls['projects'] || {
        items: []
    };

    let filterProjects = projects;
    if(visibleProjects.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterProjects = projects;
    }
    const filteredImages = getVisibleImages(items, filterProjects);

    return {
        images: filteredImages,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onImageClick: (id, name) => {
            // dispatch(setCategoryFilter(id, name));
            console.log('ImageClick: ' + id);
        }
    };
};

const Images = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageList);

export default Images;
