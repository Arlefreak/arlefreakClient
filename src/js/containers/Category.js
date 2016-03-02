import { connect } from 'react-redux';
import  CategoryRow from '../components/categoryRow.jsx';;

const mapStateToProps = (state, ownProps) => {
    const { apiCalls, categoryFilter } = state;
    const { category } = ownProps;
    let active = false;

    if(categoryFilter){
        if(categoryFilter.id === category.id){
            active = true;
        }
    }
    return {
        category,
        active
    };
};

const Category = connect(
    mapStateToProps
)(CategoryRow);

export default Category;
