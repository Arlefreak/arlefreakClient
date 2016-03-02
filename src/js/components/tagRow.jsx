import React, { PropTypes } from 'react';

const TagRow = ({ onClick, name }) => (
    <li>
        <a
            onClick={onClick}
        >
            {name}
        </a>
    </li>
);

TagRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default TagRow;
