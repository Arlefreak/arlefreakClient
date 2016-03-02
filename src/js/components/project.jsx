import React, { PropTypes } from 'react';
import Images from './imageList.jsx';
import Isvg from 'react-inlinesvg';
import LinkList from './linkList.jsx';
import TagList from './tagList.jsx';
import ImageList from './imageList.jsx';
import Loading from './loading.jsx';

const Project = ({ 
    isFetching,
    project,
    links,
    images,
    onTagClick,
    onImageClick
}) => (
<article className="projects">
    { isFetching && 
        <Loading/>
        }
        { !isFetching &&
            <div>
                <section>
                    <h2>{ project.name }</h2>
                    <LinkList
                        links = { links.items }
                    ></LinkList>
                    <p>{ project.description }</p>
                    <TagList
                        tags = { project.tags }
                        onTagClick = { onTagClick }
                    ></TagList>
                </section>
                <ImageList
                    images = { images.items }
                    onImageClick = { onImageClick }
                /> 
                <img className="index" src="img/p.svg" alt="Icono"/>
            </div>
            }
        </article>
);

Project.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired
    }).isRequired,
    links: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        items:PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired).isRequired
    }),
    images: PropTypes.shape({
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired).isRequired
    }),
    onTagClick: PropTypes.func.isRequired,
    onImageClick: PropTypes.func.isRequired
};
export default Project;
