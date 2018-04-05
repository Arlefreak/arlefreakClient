import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ImageRow = ({ image, thumbnailBW, thumbnail, project, onImageClick}) => {
    return (
        <li className="grid-cell">
            <Link 
                to={'/projects/' + project }
                onClick={ onImageClick }
            >
                <img
                    src= { thumbnail }
                    className="imgColor"
                />
                <img
                    src= { thumbnailBW }
                    className="imgBW"
                />
            </Link>
        </li>
    );
};

ImageRow.propTypes = {
    image: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailBW: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired
};

export default ImageRow;
