import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../actions/api_actions';
import  ImageList from '../components/image__list.jsx';;

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
    const { apiCalls, visibleItems, tagFilter, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.images || {
        isFetching: true,
        items: []
    };

    const _list = ownProps.items || [];

    let filterItems = visibleItems;
    if(visibleItems.length === 0 && tagFilter.length === 0 && categoryFilter.id === 0){
        filterItems = _list;
    }

    const filteredImages = getVisibleImages(items, filterItems);

    return {
        images: filteredImages,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onImageClick: (id, name) => {
        }
    };
};

const Images = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageList);

export default Images;
