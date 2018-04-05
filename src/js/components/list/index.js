import PropTypes from 'prop-types';
import React from 'react';
import Page from '../page';
import Row from '../row';

const List = ({ items, route, className }) => {
  let classes = className + ' vertical-list';
  return (
    <ul className={classes}>
      {items.map(item => <Row key={item.id} route={route} {...item} />)}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      dateUpdated: PropTypes.string,
    }).isRequired
  ).isRequired,
  className: PropTypes.string,
  route: PropTypes.string,
};

export default List;
