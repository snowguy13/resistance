import './Resistance.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkWebSocket from './util/link-web-socket';
import { open, message, error, close } from '../actions/sockets';
import { map } from '../utility/object';
import { Classes } from '../constants/container-types';

class Resistance extends Component {
  static displayName = 'Resistance'

  static propTypes = {
    messages: PropTypes.array
  }

  render() {
    const Container = this.props.Container;

    return (
      <div className="Resistance">
        { Container ? <Container /> : "Loading..." }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    Container: Classes[ state.container ]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    socketBindings: map(
      { open, message, error, close },
      (action) => (ev) => dispatch(action(ev))
    )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( LinkWebSocket(Resistance) );
