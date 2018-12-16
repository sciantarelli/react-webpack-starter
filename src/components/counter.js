import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({count: this.state.count + 1})
  }

  render() {
    return (
      <h2 onClick={this.increment}>{this.state.count}</h2>
    )
  }

}

export default Counter;