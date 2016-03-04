import React, { PropTypes } from 'react';
import Project from './projectRow.jsx';
import Loading from './loading.jsx';

const ProjectList = ({ projects, isFetching }) => {
    if(!isFetching){
        return (
            <Loading/>
        );
    }else{
        return (
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
    }
};

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    isFetching: PropTypes.bool
};

export default ProjectList;
