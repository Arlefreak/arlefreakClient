import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import FilterList from '../components/filter__list.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: items
    } = ownProps.categories || {
        isFetching: true,
        items: []
    };

    let active = [];
    active.length = 0;

    let allActive = categoryFilter.id === 0;

    if(items.length > 0 && items[0].id !== 0 ){
        if(categoryFilter) {
            items.map((item) => {
                if(categoryFilter.id === item.id){
                    active.push(true);
                }else{
                    active.push(false);
                }
            });
        }
    }

    return {
        items: items,
        isFetching,
        lastUpdated,
        active,
        allActive,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('portfolio/projectsCategories'));
    return {
        onClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
            dispatch(filterProjects());
        },
        clearAll: () =>{
            dispatch(setCategoryFilter(0, 'All'));
            dispatch(filterProjects());
        }
    };
};

const ProjectFilterCategory = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterList);

export default ProjectFilterCategory;
