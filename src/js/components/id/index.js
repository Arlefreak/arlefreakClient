import PropTypes from 'prop-types';
import React from 'react';

const Id = ({ index }) => {
  const src = '/img/routes/' + index + '.svg';
  return (
    <div>
      <img className="index" src={src} alt="Icono" />
      <img src="/img/icono.png" alt="ellugar" className="ellugar-icon" />
    </div>
  );
};

Id.propTypes = {
  index: PropTypes.string.isRequired,
};

export default Id;
