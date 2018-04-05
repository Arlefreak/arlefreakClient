import PropTypes from 'prop-types';
import React from 'react';
import Image from '../gallery__row';

const ImageList = ({ images }) => {
  return (
    <section className="gallery">
      {images.map(image => <Image key={image.id} {...image} />)}
    </section>
  );
};

ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageList;
