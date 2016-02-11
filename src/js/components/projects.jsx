import React from 'react';
import List from './list.jsx';
import Loading from './Loading.jsx';
import fetch from 'isomorphic-fetch';
import constants from './constants.js';

const apiURL = constants.APIURL;

class Projects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            categories: []
        };
    }

    componentWillMount() {
        fetch(apiURL + 'projects')
        .then((response) => {
            console.log('Response:');
            return response.json();
        })
        .then((projects) => {
            console.log('Projects:');
            this.setState({
                projects: projects
            });
        });

        fetch(apiURL + 'projectsCategories')
        .then((response) => {
            console.log('Response:');
            return response.json();
        })
        .then((categories) => {
            console.log('Projects:');
            this.setState({
                categories: categories
            });
        });
    }

    render() {
        if (this.state.projects.length > 0) {
            console.log(this.state.projects);
            return React.createElement(List, Object.assign({}, this.props, {
                list: this.state.projects,
                nav: this.state.categories
            }));
        } else {
            return React.createElement(Loading);
        }
    }

}
export default Projects;
