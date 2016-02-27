import React, { PropTypes } from 'react'
import smallProject from './smallProject.jsx'

const ProjectList = ({ projects }) => (
    <ul className="vertical-list">
        {
            todos.map(project =>
                      <smallProject
                          key={project.id}
                          {...project}
                      />
                      )
        }
    </ul>
)

TodoList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default ProjectList
