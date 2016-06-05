import React from 'react';
import { render } from 'react-dom';
import Resistance from './components/resistance';

// Grab a reference to the root element
const root = document.getElementById('root');

// Ensure there is web socket support
if( !window.WebSocket ) {
  root.innerHTML = "Looks like your browser doesn't support WebSockets. "
   + "Unfortunately, they're needed to run this game, so you're out of luck!";
} else {
  const webSocket = new WebSocket(`ws://${window.location.host}`);

  webSocket.onopen = () => {
    render( <Resistance socket={ webSocket } />, document.getElementById('root') );
  };
}
