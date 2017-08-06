import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';
import { filterOutNonNumbers } from './utils';

const API_URL = 'http://frontend-exercise.apps.staging.digital.gov.au/bars';

const Bar = (props) => {
  // don't allow the width to go about 100%
  const barWidth = Math.min(props.value, 100);

  const barFillStyle = {
    width: `${barWidth}%`,
  };

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
      className={className}
      onClick={() => props.changeActiveBar(props.pos)}
    >
      {props.value}%
      <div
        style={barFillStyle}
        className={barClassName}
      />
    </div>
  );
};

const BarWrapper = (props) => {
  console.log('  --  >  App.js:39 > BarWrapper > props.activeBarIndex:', props.activeBarIndex);
  return (
    <div className="BarWrapper">
      {props.barValues.map((barValue, i) => (
        <Bar
          key={i} // the key must be the index since there could be two identical values
          pos={i}
          value={barValue}
          changeActiveBar={props.changeActiveBar}
          active={i === props.activeBarIndex}
        />
      ))}
    </div>
  )
};

const ActiveBarSelector = (props) => {
  if (!props.barValues || !props.barValues.length) return null;

  return (
    <select
      className="ActiveBarSelector"
      value={props.activeBarIndex}
      onChange={(e) => {
        props.changeActiveBar(Number(e.target.value))
      }}
    >
      {props.barValues.map((bar, i) => (
        <option
          key={i} // the key must be the index since there could be two identical values
          value={i}
        >
          {`Progress bar #${i + 1}`}
        </option>
      ))}
    </select>
  )
};

const ValueIncrementer = (props) => {
  return (
    <button
      className="ValueIncrementer"
      onClick={() => props.changeCurrentBarValue(props.value)}
    >
      {props.value}
    </button>
  )
};

const ValueIncrementerWrapper = (props) => {
  return (
    <div className="ValueIncrementerWrapper">
      {props.buttonValues.map((buttonValue, i) => (
        <ValueIncrementer
          key={i} // the key must be the index since there could be two identical values
          value={buttonValue}
          changeCurrentBarValue={props.changeCurrentBarValue}
        />
      ))}
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonValues: [],
      barValues: [],
      activeBarIndex: 0,
    };

    this.changeCurrentBarValue = this.changeCurrentBarValue.bind(this);
    this.changeActiveBar = this.changeActiveBar.bind(this);
  }

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const buttonValues = filterOutNonNumbers(data.buttons)
          .sort((a, b) => a - b); // sort() alone doesn't sort negatives correctly
        const barValues = filterOutNonNumbers(data.bars);

        this.setState({ buttonValues, barValues });
      });
  }

  changeCurrentBarValue(amount) {
    const { barValues, activeBarIndex } = this.state;

    // clone the array so we're not mutating state
    const newBarValues = barValues.slice();

    // don't allow the value to go below zero
    newBarValues[activeBarIndex] = Math.max(0, newBarValues[activeBarIndex] + amount);

    this.setState({
      barValues: newBarValues,
    })
  }

  changeActiveBar(activeBarIndex) {
    console.log('  --  >  App.js:130 > changeActiveBar > activeBarIndex:', activeBarIndex);
    this.setState({ activeBarIndex });
  }

  render() {
    return (
      <main className="App">
        <h1 className="App__title">Progress Bar Demo</h1>

        <h2 className="App__sub-title">By David Gilbertson</h2>

        <BarWrapper
          barValues={this.state.barValues}
          activeBarIndex={this.state.activeBarIndex}
          changeActiveBar={this.changeActiveBar}
        />

        <ActiveBarSelector
          activeBarIndex={this.state.activeBarIndex}
          barValues={this.state.barValues}
          changeActiveBar={this.changeActiveBar}
        />

        <ValueIncrementerWrapper
          buttonValues={this.state.buttonValues}
          changeCurrentBarValue={this.changeCurrentBarValue}
        />

      </main>
    );
  }
}

export default App;
