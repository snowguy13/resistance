const WebSocket = require("ws");
const httpServer = require("./http-server");
const server = new WebSocket.Server({ server: httpServer });

const onConnection = (ws) => {
  console.log("Received new connection: ", ws);
};

const onMessage = (ws, message) => {
  
};

WebSocket.prototype.sendJson = (data) => {
  this.send( JSON.stringify(data) );
};

WebSocket.Server.prototype.broadcast = (data) => {
  this.clients.forEach(client => {
    client.sendJson( data );
  });
};

module.exports = server;
