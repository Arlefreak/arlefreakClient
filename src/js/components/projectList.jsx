import React, { PropTypes } from 'react';
import Project from './projectRow.jsx';

const ProjectList = ({ projects }) => (
    <ul className="vertical-list">
        {
            projects.map( project =>
                         <Project
                             key={project.id}
                             {...project}
                             id={ project.id }
                             name={ project.name }
                             onClick={() => onProjectClick(project.id)}
                         />
                         )
        }
    </ul>
);

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default ProjectList;
