import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions';
import  CategoryList from '../components/categoryList.jsx';;

const mapStateToProps = (state, ownProps) => {
    return {
        categoryFilter: {
            id: ownProps.id,
            name: ownProps.name
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setCategoryFilter(ownProps.id, ownProps.name));
        }
    };
};

const CategoryFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList);

export default CategoryFilter;
