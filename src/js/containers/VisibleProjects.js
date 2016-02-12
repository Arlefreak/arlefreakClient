import { connect } from 'react-redux';
import ProjectList from '../components/projectList.jsx';

const getVisibleProjects = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_BY_CATEGORY':
            return todos.filter(t => t.completed);
        case 'SHOW_BY_TAG':
            return todos.filter(t => !t.completed);
    }
};

const mapStateToProps = (state) => {
    return {
        projects: getVisibleProjects(state.todos, state.visibilityFilter)
    };
};


const VisibleProjectList = connect(
    mapStateToProps
)(ProjectList);

export default VisibleProjectList;
