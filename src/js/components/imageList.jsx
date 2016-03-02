import React, { PropTypes } from 'react';
import Image from './imageRow.jsx';

const ImageList = ({ images, onImageClick }) => (
    <section className="gallery">
        {
            images.map( image =>
                         <Image
                             key={image.id}
                             {...image}
                             onImageClick={ onImageClick }
                         />
                         )
        }
    </section>
);

ImageList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onImageClick: PropTypes.func.isRequired
};

export default ImageList;
