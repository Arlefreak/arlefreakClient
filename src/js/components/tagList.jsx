import React, { PropTypes } from 'react';
import Tag from './tagRow.jsx';

const TagList = ({ tags, onTagClick }) => (
    <ul className="tags" >
        {
            tags.map((tag ,id)=>
                     <Tag
                         key={ id }
                         name={ tag }
                         onClick={() => onTagClick(tag.id)}
                     />
                     )}
                 </ul>
);

TagList.propTypes = {
    // tags: PropTypes.arrayOf(PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onTagClick: PropTypes.func.isRequired
};

export default TagList;
