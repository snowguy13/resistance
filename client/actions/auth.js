export const LOG_IN_START = 'AUTH_LOG_IN_START';
export const logInStart = ({ username, password }) => ({
  type: LOG_IN_START,
  username,
  password
});

export const LOG_IN_FAILURE = 'AUTH_LOG_IN_FAILURE';
export const logInFailure = ({ username, password }) => ({
  type: LOG_IN_FAILURE,
  username,
  password
});

export const LOG_IN_SUCCESS = 'AUTH_LOG_IN_SUCCESS';
export const logInSuccess = ({ username, password }) => ({
  type: LOG_IN_SUCCESS,
  username,
  password
});

export const logInAsync = ({ username, password }) => {
  return dispatch => {
    // Signal a login has started.
    dispatch( logInStart({ username, password }) );

    // For now, fake a login. Succeeds 90% of the time.
    setTimeout(
      () => dispatch( ( Math.random() > .9 ? logInFailure : logInSuccess )({ username, password }) ),
      1000
    )
  };
};
