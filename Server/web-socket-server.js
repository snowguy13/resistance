const WebSocket = require("ws");
const httpServer = require("./http-server");
const server = new WebSocket.Server({ server: httpServer });

// Add a few convenience methods to the prototype.
WebSocket.prototype.sendJson = function(data) {
  this.send( JSON.stringify(data) );
};

WebSocket.Server.prototype.broadcast = function(data) {
  this.clients.forEach(client => {
    client.sendJson( data );
  });
};

const onConnection = (ws) => {
  console.log("Received new connection");

  ws.sendJson({
    type: 'info',
    message: 'Welcome to the server!'
  });

  server.broadcast({
    type: 'info',
    message: 'New connection received'
  });
};

const onMessage = (ws, message) => {

};

const onClose = (ws) => {
  console.log('A connection was lost');
  server.broadcast({
    type: 'info',
    message: 'Lost a connection'
  });
}

server.on('connection', (ws) => {
  onConnection( ws );
  ws.on('message', (message) => onMessage( ws, message ));
  ws.on('close', () => onClose( ws ));
});

module.exports = server;
