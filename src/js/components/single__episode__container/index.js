import PropTypes from 'prop-types';
import React from 'react';
import Page from '../../containers/page';
import Single from '../single';
import Episode from '../episode';
import TagList from '../../containers/tag_list';
import LinkList from '../link__list';
import ImageList from '../gallery__list';

const Container = ({
  id,
  title,
  isFetching,
  item,
  images,
  links,
  tags,

  slug,
  iTunesURL,
  feed,
  prev,
  next,

  meta_url,
  meta_title,
  meta_description,
  meta_preview,
}) => {
  return (
    <Page
      id={id}
      isFetching={isFetching}
      meta_url={meta_url}
      meta_title={meta_title}
      meta_description={meta_description}
      meta_preview={meta_preview}
      meta_audio={item.audio_mp3}
    >
      <h1>{item.title}</h1>
      {item.dateCreated != null && (
        <div className="date-container full-width">
          <span className="date">{item.dateCreated} |</span>
          <span className="date"> {item.dateUpdated}</span>
        </div>
      )}
      {links != null && <LinkList links={links} />}
      <Episode
        item={item}
        slug={slug}
        iTunesURL={iTunesURL}
        feed={feed}
        next={next}
        prev={prev}
      />
    </Page>
  );
};

Container.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  meta_description: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape),
  images: PropTypes.arrayOf(PropTypes.shape),
  tags: PropTypes.arrayOf(PropTypes.shape),

  slug: PropTypes.string.isRequired,
  iTunesURL: PropTypes.string,
  feed: PropTypes.string.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,

  meta_description: PropTypes.string,
  meta_url: PropTypes.string,
  meta_title: PropTypes.string,
  meta_preview: PropTypes.string,
};

export default Container;
