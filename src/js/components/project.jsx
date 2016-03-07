import React, { PropTypes } from 'react';
import Images from './imageList.jsx';
import Isvg from 'react-inlinesvg';
import LinkList from './linkList.jsx';
import TagList from './projectTagList.jsx';
import ImageList from './gallery.jsx';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const Project = ({ 
    isFetching,
    project,
    links,
    images,
    onTagClick,
    onImageClick
}) => {
    var md = new Remarkable();
    var mdr = md.render(project.description);
    if(!isFetching){
        return(
            <article className="project">
                <div>
                    <section className="info">
                        <h2>{ project.name }</h2>
                        <LinkList
                            links = { links.items }
                        ></LinkList>
                        <div  dangerouslySetInnerHTML={{ __html: mdr }}/>
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
            </article>
        );
    }else{
        return(
            <article className="project">
                <Loading/>
            </article>
        );
    }
};

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
