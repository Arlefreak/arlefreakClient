import React, { PropTypes } from 'react';

const CategoryRow = ({ onClick, category, active}) => (
    <li>
        <a 
            className={ active && 'active'}
            onClick={ onClick }>
            {category.name}
        </a>
    </li>
);

CategoryRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
};

export default CategoryRow;
