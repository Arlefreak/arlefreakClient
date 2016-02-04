import React from 'react';
import fetch from 'isomorphic-fetch';
import Loading from './Loading.jsx';

const apiURL = 'http://api.arlefreak.com/projects/';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projec: {}
        };
    }

    componentDidMount() {
        fetch(apiURL + this.props.params.id)
        .then((response) => {
            return response.json();
        })
        .then((project) => {
            this.setState({
                project: project
            });
        });
    }

    render() {
        if (this.state.project !== undefined) {
            console.log(this.state.project);
            return(
                <article>
                    <h2>{ this.state.project.name }</h2>
                    <p>{this.state.project.description}</p>
                </article>
            );
        } else {
            return React.createElement(Loading);
        }
    }
}

export default Project;
