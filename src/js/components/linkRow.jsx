import React, { PropTypes } from 'react';
import Isvg from 'react-inlinesvg';

const CategoryRow = ({ onClick, name }) => (
    <li>
        <a onClick={ onClick }>
            <Isvg
                src= "https://apiarlefreak.s3.amazonaws.com/images/Link20160218213223.svg"
                uniquifyIDs={false}
            >
                <img src= "https://apiarlefreak.s3.amazonaws.com/images/Link20160218213223.svg"/>
            </Isvg>
        </a>
    </li>
);

CategoryRow.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default CategoryRow;
