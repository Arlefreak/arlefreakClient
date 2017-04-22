import { connect } from 'react-redux';
import { addTagFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, tagFilter } = state;

    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.tags || {
        isFetching: true,
        items: []
    };


    let active = [];
    active.length = 0;

    let allActive = tagFilter.length > 0 ? true : false;

    if(items.length > 0 && items[0].tag_id !== 0 ){
        for(var i = 0; i < items.length; i++){
            for(var j = 0; j < tagFilter.length; j++){
                if(items[i].tag_id === tagFilter[j].tag_id)
                {
                    active.push(true);
                    console.log('true');
                }
                else{
                    active.push(false);
                    console.log('false');
                }
            }
        }
    }

    console.log(active);

    return {
        items: items,
        isFetching,
        lastUpdated,
        active,
        allActive,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectTags'));
    return {
        onClick: (tag_id, name) => {
            dispatch(addTagFilter(tag_id, name));
        }
    };
};

const ProjectFilterTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterTag;
