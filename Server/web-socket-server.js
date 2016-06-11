const WebSocket = require("ws");
const httpServer = require("./http-server");
const server = new WebSocket.Server({ server: httpServer });

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

WebSocket.prototype.sendJson = function(data) {
  this.send( JSON.stringify(data) );
};

WebSocket.Server.prototype.broadcast = function(data) {
  this.clients.forEach(client => {
    client.sendJson( data );
  });
};

server.on('connection', (ws) => {
  onConnection( ws );
  ws.on('message', (message) => onMessage( ws, message ));
});

module.exports = server;
