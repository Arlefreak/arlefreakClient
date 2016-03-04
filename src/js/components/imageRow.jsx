import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ImageRow = ({ image, thumbnail, project, onImageClick}) => {
    var imgStyle = {
        backgroundImage: 'url(' + thumbnail + ')'
    };
    return (
        <li>
            <Link 
                style={ imgStyle }
                to={'/projects/' + project }
                onClick={ onImageClick }

            ></Link>
        </li>
    );
};

ImageRow.propTypes = {
    image: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    project: PropTypes.number.isRequired,
    onImageClick: PropTypes.func.isRequired
};

export default ImageRow;
