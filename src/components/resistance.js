import React, { Component } from 'react';

class Resistance extends Component {
  constructor(props) {
    super(props);

    const socket = props.socket;

    socket.onmessage = (message) => console.log(message);
  }

  render() {
    return (<div className="resistance">Loaded!</div>);
  }
};

export default Resistance;
