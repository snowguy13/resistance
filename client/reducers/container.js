import Actions from '../actions/all';
import * as ContainerTypes from '../constants/container-types';

export default function( state = undefined, action ) {
  let nextState = state || ContainerTypes.LOBBY;

  switch( action.type ) {
    case Actions.SET_CONTAINER:
      nextState = action.container;
      break;
    case Actions.Auth.LOG_IN_SUCCESS:
      if (state === ContainerTypes.LOGIN) {
        nextState = ContainerTypes.LOBBY;
      }
      break;
    default:;
  }

  return nextState;
};
