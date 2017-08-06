import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';
import { filterOutNonNumbers } from './utils';

const Bar = (props) => {
  // don't allow the width to go about 100%
  const barWidth = Math.min(props.value, 100);

  const barFillStyle = {
    width: `${barWidth}%`,
  };

  const barClassName = classnames(
    'Bar__fill',
    { 'Bar__fill--over-warning': props.value > 100 },
  );

  return (
    <div className="Bar">
      {props.value}

      <div
        style={barFillStyle}
        className={barClassName}
      />
    </div>
  );
};

const BarWrapper = (props) => {
  return (
    <div className="BarWrapper">
      {props.barValues.map((barValue, i) => (
        <Bar
          key={i} // the key must be the index since there could be two identical values
          value={barValue}
        />
      ))}
    </div>
  )
};

const ValueIncrementer = (props) => {
  return (
    <button
      onClick={() => props.changeCurrentBarValue(props.value)}
    >
      {props.value}
    </button>
  )
};

const ValueIncrementerWrapper = (props) => {
  return (
    <div className="BarWrapper">
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
  }

  componentDidMount() {
    fetch('http://frontend-exercise.apps.staging.digital.gov.au/bars')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const buttonValues = filterOutNonNumbers(data.buttons).sort();
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

  render() {
    return (
      <main className="App">
        <h1 className="App__title">Progress Bar Demo</h1>

        <h2 className="App__sub-title">By David Gilbertson</h2>

        <BarWrapper barValues={this.state.barValues} />

        <ValueIncrementerWrapper
          buttonValues={this.state.buttonValues}
          changeCurrentBarValue={this.changeCurrentBarValue}
        />
      </main>
    );
  }
}

export default App;
