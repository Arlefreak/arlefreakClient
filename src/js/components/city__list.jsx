import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Row from './city__row.jsx';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const List = ({ items, className }) => {
    let classes = className + ' vertical-list';
    return (
        <ul
            className = { classes }
        >
            {
                items.map( item =>
                    <Row
                        key={ item.id }
                        {...item}
                    />
                )
            }
        </ul>
    );
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        city: PropTypes.string.isRequired,
        dateUpdated: PropTypes.string
    }).isRequired).isRequired,
    className: PropTypes.string,
};

export default List;
