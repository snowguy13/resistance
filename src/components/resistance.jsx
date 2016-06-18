import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LinkWebSocket from './util/link-web-socket';
import { open, message, error, close } from '../actions/sockets';
import { map } from '../utility/object';

class Resistance extends Component {
  static propTypes = {
    messages: PropTypes.array
  }

  render() {

    return (
      <div className="resistance">
        Loaded -- messages are below!
        <div className="messages">{
          (this.props.messages || []).map( (message, i) =>
            <div className="message" key={i}>
              <strong>{ message.title }</strong><span>{ message.body }</span>
            </div>
          )
        }</div>
      </div>
    );
  }
};

Resistance.displayName = 'Resistance';

const mapStateToProps = (state) => {
  return {
    messages: state.messages
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
