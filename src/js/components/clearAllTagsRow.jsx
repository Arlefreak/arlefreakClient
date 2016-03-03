import React, { PropTypes } from 'react';

const TagRow = ({ active, onClick }) => (
    <li>
        <a
            className={ active && 'active'}
            onClick={ onClick }>
            All
        </a>
    </li>
);

TagRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
};

export default TagRow;
