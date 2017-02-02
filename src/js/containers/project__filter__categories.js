import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = apiCalls['portfolio/projectsCategories'] || {
        isFetching: true,
        items: []
    };

    if(items.length > 0 && items[0].id !== 0 ){
        items.unshift({
            id: 0,
            name:'Alll',
        });

        if(categoryFilter){
            items.map(( item ) => {
                if(categoryFilter.id === item.id){
                    item.active = true;
                }
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
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    return {
        onClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
            dispatch(filterProjects());
        }
    };
};

const ProjectFilterCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterCategory;
