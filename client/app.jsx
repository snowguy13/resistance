import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Resistance from './components/resistance';
import reducers from './reducers/all';

// Grab a reference to the root element
const root = document.getElementById('root');

// Ensure there is web socket support
if( !window.WebSocket ) {
  root.innerHTML = "Looks like your browser doesn't support WebSockets. "
   + "Unfortunately, they're needed to run this game, so you're out of luck!";
} else {
  let store = createStore(
    reducers,
    {},
    compose(
      window.devToolsExtension ? window.devToolsExtension() : () => (),
      applyMiddleware( reduxThunk )
  );

  render(
    <Provider store={store}>
      <Resistance socketUrl={`ws://${window.location.host}`} />
    </Provider>,
    document.getElementById('root') );
}
