import React from 'react';
import PropTypes from 'prop-types';
import './ValueIncrementer.css';

const ValueIncrementer = (props) => (
  <button
    className="ValueIncrementer"
    onClick={() => props.changeCurrentBarValue(props.value)}
  >
    {props.value}
  </button>
);

ValueIncrementer.propTypes = {
  changeCurrentBarValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default ValueIncrementer;
