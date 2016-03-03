import React, { PropTypes } from 'react';
import ProjectList from '../containers/VisibleProjects.js';
import CategoryList from '../containers/CategoryFilter.js';
import TagList from '../containers/TagFilter.js';
import Loading from './loading.jsx';

const Portfolio = ({ isFetching }) => {
    var element;
    if(isFetching){
        element = 
            <article className="projects">
                <Loading/>
                <img className="index" src="img/p.svg" alt="Icono"/>
            </article>;
    }else{
        element = 
            <article className="projects">
                <h2>Projects</h2>
                <CategoryList></CategoryList>
                <TagList></TagList>
                <ProjectList></ProjectList>
                <img className="index" src="img/p.svg" alt="Icono"/>
            </article>;
    }
    return (element);
};

Portfolio.propTypes = {
    isFetching: PropTypes.bool
};

export default Portfolio;
