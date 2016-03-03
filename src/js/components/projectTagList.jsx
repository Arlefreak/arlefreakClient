import React, { PropTypes } from 'react';
import Tag from '../containers/ProjectTag.js';

const TagList = ({ tags }) => (
    <ul className="tags" >
        {
            tags.map(tag =>
                     <Tag
                         key={ tag.id }
                         tag={ tag }
                     />
                     )}
                 </ul>
);

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default TagList;
