import AllActions from '../actions/all';
import * as ContainerTypes from '../components/container-types';

export default function(state = undefined, action) {
  let nextState = state || ContainerTypes.LOGIN;

  switch( action.type ) {
    case AllActions.SET_CONTAINER:
      nextState = action.container;
      break;
    default:;
  }

  return nextState;
};
