import AllActions from '../actions/all';

export default function(state = {}, action) {
  const messages = state.messages ?
    state.messages.slice(0) : [];
  const message = {};

  switch( action.type ) {
    case AllActions.Sockets.SOCKET_OPEN:
      message.title = "Open";
      message.body = "[ A socket connection was established. ]";
      break;
    case AllActions.Sockets.SOCKET_MESSAGE:
      message.title = "Message";
      message.body = JSON.stringify(action.data);
      break;
    case AllActions.Sockets.SOCKET_ERROR:
      message.title = "Error";
      message.body = "[ Something has gone horribly wrong. ]";
      break;
    case AllActions.Sockets.SOCKET_CLOSE:
      message.title = "Close";
      message.body = "[ It appears the connection has been closed. ]";
      break;
  }

  if( message.title ) {
    messages.push( message );
  }

  return { messages };
};

// TODO -- actions in LinkWebSocket are getting created, but not dispatched
