import React, { PropTypes } from 'react';

const TagRow = ({ name }) => (
    <li>
        <a
        >
            {name}
        </a>
    </li>
);

TagRow.propTypes = {
    name: PropTypes.string.isRequired
};

export default TagRow;
