import { connect } from 'react-redux';
import { setCategoryFilter } from '../actions/actions';
import  Project from '../components/project.jsx';;

const mapStateToProps = (state, ownProps) => {
    return {
        categoryFilter: {
            id: ownProps.id,
            name: ownProps.name
        },
        categories: state.apiCalls.projectsCategories.items
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCategoryClick: (id, name) => {
            dispatch(setCategoryFilter(id, name));
        }
    };
};

const ProjectV = connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);

export default ProjectV;
