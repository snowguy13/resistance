export const OPEN = 'SOCKET_OPEN';
export const open = ( event ) => ({
  type: OPEN,
  event
});

export const MESSAGE = 'SOCKET_MESSAGE';
export const message = ( event ) => ({
  type: MESSAGE,
  data: JSON.parse( event.data ),
  event
});

export const ERROR = 'SOCKET_ERROR';
export const error = ( error ) => ({
  type: ERROR,
  error
});

export const CLOSE = 'SOCKET_CLOSE';
export const close = ( event ) => ({
  type: CLOSE,
  event
});
