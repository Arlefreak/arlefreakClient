import { connect } from 'react-redux';
import { addTagFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projectTags'] || {
        isFetching: true,
        items: []
    };

    let itemsCopy = Object.assign([], items);

    if(itemsCopy.length > 0 && itemsCopy[0].id !== 0 ){
        itemsCopy.unshift({
            id: 0,
            name:'Alll',
        });
        itemsCopy.map(( item ) => {
            item.id = item.tag_id;
            item.name = item.tag;
            item.active = false;
            console.log(item);
        }
        );

        if(tagFilter){
            itemsCopy.map(( item ) => {
                tagFilter.map(( filter ) => {
                    if(filter.id === item.id){
                        item.active = true;
                    }
                });
            }
            );
        }
    }
    return {
        items: items,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onClick: (id, name) => {
            dispatch(addTagFilter(id, name));
        }
    };
};

const ProjectFilterTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterTag;
