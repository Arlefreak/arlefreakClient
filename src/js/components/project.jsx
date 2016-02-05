import React from 'react';
import fetch from 'isomorphic-fetch';
import Loading from './Loading.jsx';

const apiURL = 'http://api.arlefreak.com/';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projec: {},
            links: []
        };
    }

    componentDidMount() {
        fetch(apiURL + 'projects/' + this.props.params.id)
        .then((response) => {
            return response.json();
        })
        .then((project) => {
            this.setState({
                project: project
            });
        });

        fetch(apiURL + 'projectsLinks/?project__id=' + this.props.params.id)
        .then((response) => {
            return response.json();
        })
        .then((links) => {
            this.setState({
                links: links
            });
        });
    }

    render() {
        if (this.state.project !== undefined) {
            return(
                <article className="projects">
                    <h2>{ this.state.project.name }</h2>
                    <ul className="links">
                        {
                            this.state.links.map((single) => {
                                console.log(single);
                                return (
                                    <li key={single.id}>
                                        <a href={single.link} alt={ single.name }><img src={ single.category.image } /></a>
                                    </li>
                                    );
                            })
                        }
                    </ul>
                    <p>{this.state.project.description}</p>
                    <ul className="tags">
                        {
                            this.state.project.tags.map((single, index) => {
                                console.log(single);
                                return (
                                    <li key={index}>
                                        <a href="#">{ single }</a>
                                    </li>
                                    );
                            })
                        }
                    </ul>
                    <img className="index" src="img/p.svg" alt="Icono"/>
                </article>
            );
        } else {
            return React.createElement(Loading);
        }
    }
}

export default Project;
