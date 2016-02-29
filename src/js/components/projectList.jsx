import React, { PropTypes } from 'react';
import Project from './projectRow.jsx';

const ProjectList = ({ projects, onProjectClick }) => (
    <ul>
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
);

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onProjectClick: PropTypes.func.isRequired
};

export default ProjectList;
