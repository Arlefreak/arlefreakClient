import React, { PropTypes } from 'react';

const FilterRow = ({ onClick, name, active}) => (
    <li>
        <a 
            className={ active && 'active'}
            onClick={ onClick }>
            { name }
        </a>
    </li>
);

FilterRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

export default FilterRow;
