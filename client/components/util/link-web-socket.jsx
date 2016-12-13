import React, { Component, PropTypes } from 'react';
import { except } from '../../utility/object';

const SOCKET_EVENTS = ['open', 'message', 'error', 'close'];
const SOCKET_PROPS = ['socketUrl', 'socketBindings'];

const LinkWebSocket = ( WrappedComponent ) => {
  class LinkWebSocket extends Component {
    static propTypes = {
      socketUrl: PropTypes.string.isRequired,
      socketBindings: PropTypes.objectOf( PropTypes.func )
    }

    constructor( props ) {
      super( props );

      // Create the web socket
      const socket = new WebSocket( props.socketUrl );
      this.socket = socket;

      // If event bindings are given, bind to the socket now
      const bindings = props.socketBindings;

      if( bindings ) {

        SOCKET_EVENTS.forEach(type => {
          const handler = bindings[ type ];

          if( handler ) {
            socket.addEventListener( type, handler );
          }
        });
      }
    }

    sendSocketMessage( message ) {
      // If the message is an object, stringify it
      if( typeof message === 'object' ) {
        message = JSON.stringify( object );
      }

      // If the message isn't a string, throw an error
      if( typeof message !== 'string' ) {
        throw new TypeError('Can only send an object or string over the WebSocket.'
          + `Can't send '${message}'.`);
      }
    }

    render() {
      const props = {
        ...except( this.props, SOCKET_PROPS ),
        socket: this.socket,
        sendSocketMessage: this.sendSocketMessage,
      };

      return (<WrappedComponent {...props} />);
    }
  };

  LinkWebSocket.displayName = `LinkWebSocket(${WrappedComponent.displayName})`;

  return LinkWebSocket;
};

export default LinkWebSocket;
