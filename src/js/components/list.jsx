import PropTypes from 'prop-types';
import React from 'react';
import Page from './page.jsx';
import Row from './row.jsx';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const List = ({ items, route, className }) => {
    let classes = className + ' vertical-list';
    return (
        <CSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnter={true}
            transitionLeave={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
        >
            <ul className={ classes }>
                {
                    items.map( item =>
                        <Row
                            key={item.id}
                            route={route}
                            {...item}
                        />
                    )
                }
            </ul>
        </CSSTransitionGroup>
    );
};

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        title: PropTypes.string,
        dateUpdated: PropTypes.string
    }).isRequired).isRequired,
    className: PropTypes.string,
    route: PropTypes.string.isRequired
};

export default List;
