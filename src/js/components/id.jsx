import PropTypes from 'prop-types';
import React from 'react';

const Id = ({ index }) => {
    const src = '/img/routes/' + index + '.svg';
    return (
        <img className="index" src={ src } alt="Icono"/>
    );
};

Id.propTypes = {
    index: PropTypes.string.isRequired
};

export default Id;
