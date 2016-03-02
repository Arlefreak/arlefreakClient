import React, { PropTypes } from 'react';
import ProjectList from '../containers/VisibleProjects.js';
import CategoryList from '../containers/CategoryFilter.js';
import TagList from '../containers/TagFilter.js';

const Portfolio = () => (
    <article className="projects">
        <h2>Projects</h2>
        <CategoryList></CategoryList>
        <ProjectList></ProjectList>
        <TagList></TagList>
    </article>
);

Portfolio.propTypes = {
    // projects: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    // categories: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    // tags: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired
    // }).isRequired).isRequired
};

export default Portfolio;
