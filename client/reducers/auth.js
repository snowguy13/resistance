import * as AuthActions from '../actions/auth';

const DEFAULT_STATE = {
  lastAttempt: undefined,
  username: undefined,
  sessionStart: undefined,
  sessionEnd: undefined,
};

export default function( state = undefined, action ) {
  let nextState = { ...(state || DEFAULT_STATE) };

  switch( action.type ) {
    case AuthActions.LOG_IN_START:
      nextState.lastAttempt = Date.now();
      break;

    case AuthActions.LOG_IN_FAILURE:
      nextState.username = undefined;
      nextState.sessionStart = undefined;
      nextState.sessionEnd = undefined;
      break;

    case AuthActions.LOG_IN_SUCCESS:
      nextState.username = action.username;
      nextState.sessionStart = Date.now();
      nextState.sessionEnd = undefined;
      break;

    default:;
  }

  return nextState;
};
