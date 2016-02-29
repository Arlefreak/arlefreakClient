import React, { PropTypes } from 'react';

const TagRow = ({ onClick, name }) => (
    <li
        onClick={onClick}
    >
        {name}
    </li>
);

TagRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default TagRow;
