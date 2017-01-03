import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ItemRow = ({ id, route, name, title, dateUpdated }) => {
    var content = name;
    if(!content){
        content = title;
    }
    return(
        <li>
            <Link to={'/' + route + '/' + id }>
                <span className="date">{ dateUpdated } </span>{ content }
            </Link>
        </li>
    );
};

ItemRow.propTypes = {
    id: PropTypes.number.isRequired,
    route: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    dateUpdated: PropTypes.string
};

export default ItemRow;
