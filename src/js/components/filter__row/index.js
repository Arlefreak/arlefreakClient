import PropTypes from 'prop-types';
import React from 'react';

const FilterRow = ({ onClick, name, className}) => (
    <li>
        <a 
            className={ className }
            onClick={ onClick }>
            { name }
        </a>
    </li>
);

FilterRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default FilterRow;
