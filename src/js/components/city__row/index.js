import PropTypes from 'prop-types';
import React from 'react';

const ItemRow = ({ id, city, title, dateCreated }) => {
    let content = city;
    if( title !== null)
        content = `${city} - ${title}`;

    return(
        <li>
            <a href="#" >
                <span className="date">{ dateCreated } </span>{ city }{ title &&
                        <span className="hideDesktop"> - { title }</span>
                }
            </a>
        </li>
    );
};

ItemRow.propTypes = {
    id: PropTypes.number.isRequired,
    city: PropTypes.string,
    title: PropTypes.string,
    dateCreated: PropTypes.string,
};

export default ItemRow;
