import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Page from '../../containers/page';
import Soon from '../soon';
import ImageList from '../../containers/portfolio/images__list';
import Remarkable from 'remarkable';

const Container = ({ id, title, isFetching, items, images, config, route }) => {
  var md = new Remarkable();
  var text = config ? config.items.longDescription : '';
  var mdr = md.render(text);

  return (
    <Page id={id} title={title} isFetching={isFetching}>
      {config != null && (
        <div className="box shadow home-wrapper">
          <img
            className="avatar"
            src="https://www.gravatar.com/avatar/ca9850d5f37fdc233a6dcd03ad211886?s=1024"
            alt="avatar"
            title="avatar"
          />
          <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }} />
        </div>
      )}
      {/* <Soon></Soon> */}
      {/* { images != null && <div className="margin"></div> } */}
      {images != null && (
        <ImageList className="full-width" images={images} items={items} />
      )}
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
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  images: PropTypes.PropTypes.shape(),
  config: PropTypes.PropTypes.shape(),
  route: PropTypes.string.isRequired,
};

export default Container;
