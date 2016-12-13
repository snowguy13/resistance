export const SOCKET_OPEN = 'SOCKET_OPEN';
export function open( event ) {
  return { type: SOCKET_OPEN, event };
};

export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export function message( event ) {
  return {
    type: SOCKET_MESSAGE,
    data: JSON.parse( event.data ),
    event
  };
};

export const SOCKET_ERROR = 'SOCKET_ERROR';
export function error( error ) {
  return { type: SOCKET_ERROR, error };
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export function close( event ) {
  return { type: SOCKET_CLOSE, event };
};
