import { connect } from 'react-redux';
import ProjecList from '../components/projectList.jsx';

const getVisibleProjects = (projects, category) => {
    return projects;
    // switch (category) {
    //     case 'SHOW_ALL':
    //         return todos;
    //     case 'SHOW_COMPLETED':
    //         return todos.filter(t => t.completed);
    //     case 'SHOW_ACTIVE':
    //         return todos.filter(t => !t.completed);
    // }
};

const mapStateToProps = (state) => {
    return {
        projects: getVisibleProjects(state.projects.items)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProjectClick: (id) => {
            console.log('project click: ' + id);
            // dispatch(toggleTodo(id));
        }
    };
};

const VisibleProjects = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjecList);

export default VisibleProjects;
