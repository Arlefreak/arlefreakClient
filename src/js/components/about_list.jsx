import React, { PropTypes } from 'react';
import Entry from './about_row.jsx';
import Loading from './loading.jsx';

const AboutList = ({ items }) => {
    return (
        <ul className="vertical-list">
            {
                items.map( item =>
                             <Entry
                                 key={item.id}
                                 {...item}
                                 id={ item.id }
                                 name={ item.name }
                             />
                             )
            }
        </ul>
    );
};

AboutList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default AboutList;
