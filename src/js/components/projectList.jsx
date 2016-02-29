import React, { PropTypes } from 'react';
import Project from './projectRow.jsx';

const ProjectList = ({ projects, onProjectClick }) => (
    <article className="projects">
        <h2>Projects</h2>
        <ul className="vertical-list">
            {
                projects.map( project =>
                             <Project
                                 key={project.id}
                                 {...project}
                                 onClick={() => onProjectClick(project.id)}
                             />
                             )
            }
        </ul>
    </article>
);

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onProjectClick: PropTypes.func.isRequired
};

export default ProjectList;
