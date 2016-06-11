export const SOCKET_OPEN = 'SOCKET_OPEN';
export function open( event ) {
  console.log('Open!');
  return { type: SOCKET_OPEN, event };
};

export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export function message( event ) {
  console.log('Message!');
  return {
    type: SOCKET_MESSAGE,
    data: JSON.parse( event.data ),
    event
  };
};

export const SOCKET_ERROR = 'SOCKET_ERROR';
export function error( error ) {
  console.log('Error!');
  return { type: SOCKET_ERROR, error };
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export function close( event ) {
  console.log('Close!');
  return { type: SOCKET_CLOSE, event };
};
