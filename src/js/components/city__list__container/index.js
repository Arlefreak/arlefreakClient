import PropTypes from 'prop-types';
import React from 'react';
import Remarkable from 'remarkable';

import Page from '../../containers/page';
import List from '../city__list';

import CategoryList from '../../containers/portfolio/filter__categories';
import TagList from '../../containers/portfolio/filter__tags';
import ImageList from '../../containers/portfolio/images__list';

import Map from '../map';

const Container = ({
  id,
  title,
  isFetching,
  items,
  trips,
  categories,
  tags,
  description,
  images,

  meta_url,
  meta_title,
  meta_description,
  meta_preview,
}) => {
  return (
    <Page
      id={id}
      title={title}
      isFetching={isFetching}
      meta_url={meta_url}
      meta_title={meta_title}
      meta_description={meta_description}
      meta_preview={meta_preview}
    >
      <div className="two-child">
        <Map items={trips} />
        <List items={items} />
      </div>
    </Page>
  );
};

Container.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  categories: PropTypes.shape(),
  tags: PropTypes.shape(),
  images: PropTypes.shape(),
  description: PropTypes.string,

  meta_description: PropTypes.string,
  meta_url: PropTypes.string,
  meta_title: PropTypes.string,
  meta_preview: PropTypes.string,
};

export default Container;
