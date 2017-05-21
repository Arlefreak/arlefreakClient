import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ config }) => {
    return (
        <section className="social-subscribe">
            <p><a rel="noopener noreferrer" target="_blank" href={ config.twitter }>twitter<i className="fa fa-twitter"/></a></p>
            <p><a rel="noopener noreferrer" target="_blank" href={ 'mailto:' + config.email }>afk@ellugar.co<i className="fa fa-envelope-o"/></a></p>
            <p><a rel="noopener noreferrer" target="_blank" href={ config.github }>github<i className="fa fa-github"/></a></p>
            <p><a rel="noopener noreferrer" target="_blank" href={ config.linkdn }>linkdin<i className="fa fa-linkedin"/></a></p>
        </section>
    );
};

Container.propTypes = {
    config: PropTypes.shape().isRequired,
};

export default Container;
