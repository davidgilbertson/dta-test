import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';

const Bar = (props) => {
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
      {props.barValues.map(barValue => (
        <Bar
          key={barValue}
          value={barValue}
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
  }

  componentDidMount() {
    fetch('http://frontend-exercise.apps.staging.digital.gov.au/bars')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          buttonValues: data.buttons,
          barValues: data.bars,
        });
      });
  }

  increaseBarValue(amount) {

  }

  decreaseBarValue(amount) {

  }

  render() {
    return (
      <main className="App">
        <h1 className="App__title">Progress Bar Demo</h1>

        <h2 className="App__sub-title">By David Gilbertson</h2>

        <BarWrapper
          barValues={this.state.barValues}
        />
      </main>
    );
  }
}

export default App;
