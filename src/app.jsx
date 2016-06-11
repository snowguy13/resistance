import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Resistance from './components/resistance';
import reducers from './reducers/all';
import socketActions from './actions/sockets';

// Grab a reference to the root element
const root = document.getElementById('root');

// Ensure there is web socket support
if( !window.WebSocket ) {
  root.innerHTML = "Looks like your browser doesn't support WebSockets. "
   + "Unfortunately, they're needed to run this game, so you're out of luck!";
} else {
  let store = createStore( reducers, {} );
  render(
    <Provider store={store}>
      <Resistance socketUrl={`ws://${window.location.host}`}
                  socketBindings={ socketActions } />
    </Provider>,
    document.getElementById('root') );
}
