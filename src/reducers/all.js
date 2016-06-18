import AllActions from '../actions/all';
import * as ContainerTypes from '../components/container-types';

export default function(state = {}, action) {
  const nextState = { ...state };

  switch( action.type ) {
    case AllActions.Sockets.SOCKET_OPEN:
      nextState.container = ContainerTypes.OPENING;
    default:;
  }

  return nextState;
};
