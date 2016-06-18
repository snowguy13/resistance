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

    render() {
      const props = except( this.props, SOCKET_PROPS );
      props.socket = this.socket;
      return (<WrappedComponent {...props} />);
    }
  };

  LinkWebSocket.displayName = `LinkWebSocket(${WrappedComponent.displayName})`;

  return LinkWebSocket;
};

export default LinkWebSocket;
