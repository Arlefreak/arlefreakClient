import React, { PropTypes } from 'react';
import Isvg from 'react-inlinesvg';

const LinkRow = ({ name , link, category }) => (
    <li>
        <a href={ link }>
            <Isvg
                src= { category.image }
                uniquifyIDs={false}
            >
                <img src= "https://apiarlefreak.s3.amazonaws.com/images/Link20160218213223.svg"/>
            </Isvg>
        </a>
    </li>
);

LinkRow.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default LinkRow;
