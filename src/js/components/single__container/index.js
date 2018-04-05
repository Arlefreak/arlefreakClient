import PropTypes from 'prop-types';
import React from 'react';
import Page from '../../containers/page';
import Single from '../single';
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
  className,

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
      className={className}
    >
      {links != null && <LinkList links={links} />}
      <Single item={item} links={links} images={images} tags={tags} />
      {images != null && <ImageList images={images} />}
      {tags != null && <div className="margin" />}
      {tags != null && (
        <TagList tags={tags} className="tags tags-bottom" all={false} />
      )}
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
  className: PropTypes.string,

  meta_description: PropTypes.string,
  meta_url: PropTypes.string,
  meta_title: PropTypes.string,
  meta_preview: PropTypes.string,
};

export default Container;
