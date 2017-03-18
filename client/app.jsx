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
  // If not, too bad!
  root.innerHTML = "Looks like your browser doesn't support WebSockets. "
   + "Unfortunately, they're needed to run this game, so you're out of luck!";
} else {
  // Otherwise, create the store...
  let store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware( reduxThunk ),
      window.devToolsExtension ? window.devToolsExtension() : () => {}
    )
  );

  // ...and launch the app.
  render(
    <Provider store={store}>
      <Resistance socketUrl={`ws://${window.location.host}`} />
    </Provider>,
    root
  );
}
