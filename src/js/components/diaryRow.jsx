import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DiaryRow = ({ id, title, dateCreated }) => (
    <li>
        <Link to={'/diary/' + id }>{ title } - { dateCreated }</Link>
    </li>
);

DiaryRow.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired
};

export default DiaryRow;
