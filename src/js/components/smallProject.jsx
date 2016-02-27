import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const smallProject = ({ id, name }) => (
    <li>
        <Link to={'/projects/' + id }>{name}</Link>
    </li>
)

smallProject.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default smallProject;
