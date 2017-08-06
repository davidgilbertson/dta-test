import React from 'react';
import PropTypes from 'prop-types';
import './ValueIncrementerWrapper.css';
import ValueIncrementer from '../ValueIncrementer/ValueIncrementer';

const ValueIncrementerWrapper = (props) => (
  <div className="ValueIncrementerWrapper">
    {props.buttonValues.map((buttonValue, i) => (
      <ValueIncrementer
        key={i} // the key must be the index since there could be two identical values
        value={buttonValue}
        changeCurrentBarValue={props.changeCurrentBarValue}
      />
    ))}
  </div>
);

ValueIncrementerWrapper.propTypes = {
  buttonValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeCurrentBarValue: PropTypes.func.isRequired,
};

export default ValueIncrementerWrapper;
