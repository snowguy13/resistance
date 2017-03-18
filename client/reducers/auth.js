import * as AuthActions from '../actions/auth';

const DEFAULT_STATE = {
  /* Remembers information about the last attempted login.
   * At the moment, this includes:
   *   time:      The time the request was made
   *   username:  The username that was requested
   *   finished:  Indicates if the request has finished (success or failure)
   *   succeeded: Indicates if the request succeeded
   */
  lastAttempt: null,

  /* The username for the currently logged-in user,
   * or null if no one is logged in. */
  username: null,

  /* Timestamp for the beginning of the current user's session. */
  sessionStart: null,

  /* Timestamp for the end of the current user's session. */
  sessionEnd: null,
};

export default function( state = undefined, action ) {
  let nextState = { ...(state || DEFAULT_STATE) };

  switch( action.type ) {
    case AuthActions.LOG_IN_START:
      nextState.lastAttempt = {
        time: Date.now(),
        username: action.username,
        finished: false,
      };
      break;

    case AuthActions.LOG_IN_FAILURE:
      nextState.lastAttempt.finished = true;
      nextState.lastAttempt.succeeded = false;
      nextState.username = null;
      nextState.sessionStart = null;
      nextState.sessionEnd = null;
      break;

    case AuthActions.LOG_IN_SUCCESS:
      nextState.lastAttempt.finished = true;
      nextState.lastAttempt.succeeded = true;
      nextState.username = action.username;
      nextState.sessionStart = Date.now();
      nextState.sessionEnd = null;
      break;

    default:;
  }

  return nextState;
};
