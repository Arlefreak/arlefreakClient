import React, { PropTypes } from 'react';
import Link from './linkRow.jsx';

const LinkList = ({ links, onLinkClick }) => (
    <ul className="links">
        {
            links.map( link =>
                      <Link
                          key={link.id}
                          {...link}
                          onClick={() => onProjectClick(link.id)}
                      />
                      )
        }
    </ul>
);

LinkList.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onLinkClick: PropTypes.func.isRequired
};

export default LinkList;
