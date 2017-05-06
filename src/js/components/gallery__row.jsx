import PropTypes from 'prop-types';
import React from 'react';

const ImageRow = ({ name , image , onImageClick}) => (
        <img src= { image } alt={ name } onClick= { onImageClick }/>
);

ImageRow.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired
};

export default ImageRow;
