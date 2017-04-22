import PropTypes from 'prop-types';
import React from 'react';
import Link from './linkRow.jsx';

const LinkList = ({ links }) => (
    <ul className="links">
        {
            links.map( link =>
                      <Link
                          key={link.id}
                          {...link}
                          onClick={() => onLinkClick(link.id)}
                      />
                      )
        }
    </ul>
);

LinkList.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    }).isRequired).isRequired
};

export default LinkList;
