import React, { PropTypes } from 'react';
import Tag from '../containers/Tag.js';
import ClearAllTags from '../containers/ClearAllTags.js';

const TagList = ({ tags }) => (
    <ul className="tags" >
        <ClearAllTags/>
        {
            tags.map((tag, i)=>
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
        tag: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default TagList;
