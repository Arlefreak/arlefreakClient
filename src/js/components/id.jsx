import React, { PropTypes } from 'react';

const Id = ({ index }) => {
    const src = '/img/' + index + '.svg';
    return (
        <img className="index" src={ src } alt="Icono"/>
    );
};

Id.propTypes = {
    index: PropTypes.string.isRequired
};

export default Id;
