export const SOCKET_OPEN = 'SOCKET_OPEN';
export function open( event ) {
  console.log('Open!');
  return { type: CONNECTED, event };
};

export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export function message( event ) {
  console.log('Message!');
  return {
    type: MESSAGE_RECEIVED,
    data: JSON.parse( event.data ),
    event
  };
};

export const SOCKET_ERROR = 'SOCKET_ERROR';
export function error( error ) {
  console.log('Error!');
  return { type: ERRED, error };
};

export const SOCKET_CLOSE = 'SOCKET_CLOSE';
export function close( event ) {
  console.log('Close!');
  return { type: DISCONNECTED, event };
};
