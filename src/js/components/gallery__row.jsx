import PropTypes from 'prop-types';
import React from 'react';

const ImageRow = ({ name , image }) => (
    <img src= { image } alt={ name } />
);

ImageRow.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default ImageRow;
