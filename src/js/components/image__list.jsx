import PropTypes from 'prop-types';
import React from 'react';
import Image from './image__row.jsx';

function ImageList ({ images, onImageClick, className }) {
    return (
        <ul className={ className + ' grid images' }>
            {
                images.map( image =>
                           <Image
                               key={image.id}
                               {...image}
                               onImageClick={ onImageClick }
                           />
                           )
            }
        </ul>
    );
}

ImageList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onImageClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ImageList;
