import AllActions from '../actions/all';
import * as ContainerTypes from '../components/container-types';

export default function(state = {}, action) {
  const nextState = { ...state };

  switch( action.type ) {
    case AllActions.SET_CONTAINER:
      nextState.container = action.container;
      break;
    case AllActions.Sockets.SOCKET_OPEN:
      nextState.container = ContainerTypes.OPENING;
      break;
    default:;
  }

  return nextState;
};
