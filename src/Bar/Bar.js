import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Bar.css';

const Bar = (props) => {
  // don't allow the width to go about 100%
  const barWidth = Math.min(props.value, 100);

  const className = classnames(
    'Bar',
    { 'Bar--active': props.active },
  );

  const barClassName = classnames(
    'Bar__fill',
    { 'Bar__fill--over-warning': props.value > 100 },
  );

  return (
    <div
      role="button"
      tabIndex="0"
      className={className}
      onClick={() => props.changeActiveBar(props.pos)}
      onKeyDown={(e) => {
        // for accessibility, select this item when Enter is pressed
        if (e.keyCode === 13) props.changeActiveBar(props.pos)
      }}
    >
      {props.value}%
      <div
        style={{
          width: `${barWidth}%`,
        }}
        className={barClassName}
      />
    </div>
  );
};

Bar.propTypes = {
  active: PropTypes.bool.isRequired,
  changeActiveBar: PropTypes.func.isRequired,
  pos: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bar;
