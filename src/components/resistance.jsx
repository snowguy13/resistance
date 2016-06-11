import React, { Component } from 'react';
import LinkWebSocket from './util/link-web-socket';

class Resistance extends Component {
  render() {
    return (
      <div className="resistance">Loaded!</div>
    );
  }
};

Resistance.displayName = 'Resistance';

export default LinkWebSocket(Resistance);
