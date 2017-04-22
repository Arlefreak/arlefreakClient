import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ItemRow = ({ id, route, name, title, dateUpdated, dateCreated, link }) => {
    var content = name;
    var toRoute = link;
    if(!content){
        content = title;
    }
    return(
        <li>
            { link &&
                <a href={ link } target="_blank">
                    <span className="date">{ dateCreated } </span>{ content }
                </a>
            }
            { !link &&
                <Link to={ '/' + route + '/' + id }>
                    <span className="date">{ dateCreated } </span>{ content }
                </Link>
            }
        </li>
    );
};

ItemRow.propTypes = {
    id: PropTypes.number.isRequired,
    route: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
    dateUpdated: PropTypes.string,
    dateCreated: PropTypes.string,
    link: PropTypes.string
};

export default ItemRow;
