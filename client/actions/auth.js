export const LOG_IN_START = 'AUTH_LOG_IN_START';
export const logInStart = ({ username }) => ({
  type: LOG_IN_START,
  username,
});

export const LOG_IN_FAILURE = 'AUTH_LOG_IN_FAILURE';
export const logInFailure = ({ username }) => ({
  type: LOG_IN_FAILURE,
  username,
});

export const LOG_IN_SUCCESS = 'AUTH_LOG_IN_SUCCESS';
export const logInSuccess = ({ username }) => ({
  type: LOG_IN_SUCCESS,
  username,
});

export const logInAsync = ({ username, password }) => {
  return dispatch => {
    // Signal a login has started.
    dispatch( logInStart({ username }) );

    // For now, fake a login. Succeeds 90% of the time.
    setTimeout(
      () => dispatch( ( Math.random() > .9 ? logInFailure : logInSuccess )({ username }) ),
      1000 + Math.random() * 2000
    )
  };
};
