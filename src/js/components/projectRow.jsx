import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProjectRow = ({ id, name }) => (
    <li>
            <Link to={'/projects/' + id }>{ name }</Link>
    </li>
);

ProjectRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default ProjectRow;
