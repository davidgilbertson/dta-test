import React from 'react';
import PropTypes from 'prop-types';
import './ActiveBarSelector.css';

const ActiveBarSelector = (props) => (
  <select
    className="ActiveBarSelector"
    value={props.activeBarIndex}
    onChange={(e) => {
      // we can trust here that e.target.value is a number
      props.changeActiveBar(Number(e.target.value))
    }}
  >
    {props.barValues.map((bar, i) => (
      <option
        key={i} // the key must be the index since there could be two identical values
        value={i}
      >
        {/* define a friendly name and use 1-based numbering */}
        {`Progress bar #${i + 1}`}
      </option>
    ))}
  </select>
);

ActiveBarSelector.propTypes = {
  barValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeBarIndex: PropTypes.number.isRequired,
  changeActiveBar: PropTypes.func.isRequired,
};

export default ActiveBarSelector;
