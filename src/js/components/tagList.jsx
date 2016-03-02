import React, { PropTypes } from 'react';
import Tag from './tagRow.jsx';

const TagList = ({ tags, onTagClick }) => (
    <ul className="tags" >
        {
            tags.map(tag =>
                     <Tag
                         key={ tag.id }
                         name={ tag.name }
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
