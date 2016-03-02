import React, { PropTypes } from 'react';

const CategoryRow = ({ onClick, name }) => (
    <li>
        <a onClick={ onClick }>
            {name}
        </a>
    </li>
);

CategoryRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default CategoryRow;
