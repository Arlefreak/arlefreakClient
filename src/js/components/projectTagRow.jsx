import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TagRow = ({ tag, active, onClick }) => (
    <li>
        <Link
            to="/projects"
            className={ active && 'active'}
            onClick={ onClick }>
            { tag.name }
        </Link>
    </li>
);

TagRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
};

export default TagRow;
