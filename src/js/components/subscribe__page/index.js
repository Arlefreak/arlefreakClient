import PropTypes from 'prop-types';
import React from 'react';
import Remarkable from 'remarkable';

import Page from '../../containers/page';
import Subscribe from '../subscribe';
import Social from '../social';

const Container = ({
  id,
  title,
  isFetching,
  items,

  meta_url,
  meta_title,
  meta_description,
  meta_preview,
}) => {
  var md = new Remarkable();
  var text = items.subscribeDescription ? items.subscribeDescription : '';
  var mdr = md.render(text);

  return (
    <Page
      id={id}
      title={title}
      isFetching={false}
      meta_url={meta_url}
      meta_title={meta_title}
      meta_description={meta_description}
      meta_preview={meta_preview}
    >
      <div className="box shadow">
        <div
          className="markdown no-margin"
          dangerouslySetInnerHTML={{ __html: mdr }}
        />
      </div>
      <div className="subscribe">
        <Subscribe />
        <Social config={items} />
      </div>
    </Page>
  );
};

Container.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.shape().isRequired,

  meta_description: PropTypes.string,
  meta_url: PropTypes.string,
  meta_title: PropTypes.string,
  meta_preview: PropTypes.string,
};

export default Container;
