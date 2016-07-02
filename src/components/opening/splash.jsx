import './splash.scss';
import React, { Component, PropTypes } from 'react';

class Splash extends Component {
  static displayName = 'Splash'

  static propTypes = {
    onComplete: PropTypes.func,
  }

  static defaultProps = {
    onComplete: NOOP,
  }

  render() {
    setTimeout(() => {
      this.props.onComplete();
    }, 15000);

    return (<h1 className="Splash">The Resistance</h1>);
  }
}

export default Splash;
