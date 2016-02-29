import React, { PropTypes } from 'react';

const CategoryRow = ({ onClick, name }) => (
    <li
        onClick={onClick}
    >
        {name}
    </li>
);

CategoryRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default CategoryRow;
