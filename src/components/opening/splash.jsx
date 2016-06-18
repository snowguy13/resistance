import './splash.scss';
import React, { Component, PropTypes } from 'react';

class Splash extends Component {
  static displayName = 'Splash'
  
  render() {
    return (<h1 className="Splash">The Resistance</h1>);
  }
}

export default Splash;
