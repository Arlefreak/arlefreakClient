import React from 'react';
import fetch from 'isomorphic-fetch';
import Loading from './Loading.jsx';
import Images from './images.jsx';
import Isvg from 'react-inlinesvg';


const apiURL = 'http://api.arlefreak.com/';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projec: {},
            links: [],
            gallery: []
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

        fetch(apiURL + 'images/?project__id=' + this.props.params.id + '&imgType=gal')
        .then((response) => {
            return response.json();
        })
        .then((gallery) => {
            this.setState({
                gallery: gallery
            });
        });
    }

    render() {
        if (this.state.project !== undefined) {
            return(
                <article className="projects">
                    <section>
                        <h2>{ this.state.project.name }</h2>
                        <ul className="links">
                            {
                                this.state.links.map((single) => {
                                    console.log(single);
                                    return (
                                        <li key={single.id}>
                                            <a href={single.link} alt={ single.name }>
                                                <Isvg 
                                                    src={ single.category.image } 
                                                    uniquifyIDs={false}
                                                >
                                                    <img src={ single.category.name }/>
                                                </Isvg>
                                            </a>
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
                    </section>
                    <Images
                        id={this.state.project.id}
                    /> 
                    <img className="index" src="img/p.svg" alt="Icono"/>
                </article>
            );
        } else {
            return React.createElement(Loading);
        }
    }
}

export default Project;
