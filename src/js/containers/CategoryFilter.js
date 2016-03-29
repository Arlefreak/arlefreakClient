import { connect } from 'react-redux';
import { setCategoryFilter, filterProjects, apiFetchIfNeeded } from '../actions/actions';
import  CategoryList from '../components/categoryList.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: categories
    } = apiCalls['projectsCategories'] || {
        isFetching: true,
        items: []
    };
    if(categories.length > 0 && categories[0].id !== 0 ){
        categories.unshift({
            id: 0,
            name:'All',
        });
    }
    return {
        categories: categories,
        isFetching,
        lastUpdated
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(apiFetchIfNeeded('projectsCategories'));
    return {
        onCategoryClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
            dispatch(filterProjects());
        }
    };
};

const CategoryFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);

export default CategoryFilter;
