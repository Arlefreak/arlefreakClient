import React, { PropTypes } from 'react';

const ProjectRow = ({ onClick, name }) => (
    <li
        onClick={onClick}
    ><a>
            {name}
    </a></li>
);

ProjectRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default ProjectRow;
