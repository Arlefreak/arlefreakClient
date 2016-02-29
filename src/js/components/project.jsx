import React from 'react';
import Images from './imageList.jsx';
import Isvg from 'react-inlinesvg';
import LinkList from './linkList.jsx';
import TagList from './tagList.jsx';
import ImageList from './imageList.jsx';

const Project = ({ project, links, tags, images }) => (
    <article className="projects">
        <section>
            <h2>{ project.name }</h2>
            <LinkList
                links = { links }
            ></LinkList>
            <p>{ project.description }</p>
            <TagList
                tags = { tags }
            ></TagList>
        </section>
        <ImageList
            images = { images }
        /> 
        <img className="index" src="img/p.svg" alt="Icono"/>
    </article>
);

Project.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    links: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onProjectClick: PropTypes.func.isRequired
};
export default Project;
