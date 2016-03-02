import React, { PropTypes } from 'react';
import ProjectList from '../containers/VisibleProjects.js';
import CategoryList from '../containers/CategoryFilter.js';
import TagList from '../containers/TagFilter.js';
import Loading from './loading.jsx';

const Portfolio = ({ isFetching }) => (
    <article className="projects">
        { isFetching &&
            <Loading/>
            }
            { !isFetching &&
                <div>
                    <h2>Projects</h2>
                    <CategoryList></CategoryList>
                    <ProjectList></ProjectList>
                    <TagList></TagList>
                </div>
                }
                <img className="index" src="img/p.svg" alt="Icono"/>
            </article>
);

Portfolio.propTypes = {
    isFetching: PropTypes.bool
};

export default Portfolio;
