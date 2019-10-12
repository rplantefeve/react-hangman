import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ guesses }) => {
  const image = require(`./pendu-${guesses}.png`);
  return <img src={image} alt="pendu" />;
};

Image.propTypes = {
  guesses: PropTypes.string.isRequired,
};

export default Image;
