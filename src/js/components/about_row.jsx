import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ItemRow = ({ id, name }) => (
    <li>
            <Link to={'/about/' + id }>{ name }</Link>
    </li>
);

ItemRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default ItemRow;
