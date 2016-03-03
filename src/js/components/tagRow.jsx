import React, { PropTypes } from 'react';

const TagRow = ({ tag, active, onClick }) => (
    <li>
        <a
            className={ active && 'active'}
            onClick={ onClick }>
            { tag.name }
        </a>
    </li>
);

TagRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
};

export default TagRow;
