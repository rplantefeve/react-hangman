import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ letter, index, onClick, visibility }) => {
  let className = 'App-button' + visibility;
  return (
    <button className={className} onClick={() => onClick(index)}>
      {letter}
    </button>
  );
};

Button.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  visibility: PropTypes.string.isRequired,
};

export default Button;
