import React, { PropTypes } from 'react';
import Tag from './tagRow.jsx';

const TagList = ({ tags, onTagClick }) => (
    <ul class="tags" >
        {
            tags.map( project =>
                     <Tag
                         key={tag.id}
                         {...tag}
                         onClick={() => onTagClick(tag.id)}
                     />
                     )}
                 </ul>
);

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTagClick: PropTypes.func.isRequired
};

export default TagList;
