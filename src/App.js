import React, { Component } from 'react';
import './App.css';
import ActiveBarSelector from './ActiveBarSelector/ActiveBarSelector';
import BarWrapper from './BarWrapper/BarWrapper';
import ValueIncrementerWrapper from './ValueIncrementerWrapper/ValueIncrementerWrapper';
import { filterOutNonNumbers } from './utils';

const API_URL = 'http://frontend-exercise.apps.staging.digital.gov.au/bars';

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
    this.setState({ activeBarIndex });
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Progress Bar Demo</h1>

          <h2 className="App__sub-title">By David Gilbertson</h2>
        </header>

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
      </div>
    );
  }
}

export default App;
