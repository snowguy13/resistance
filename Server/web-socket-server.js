const WebSocketServer = require("ws").Server;
const httpServer = require("./http-server");
const server = new WebSocketServer({ server: httpServer });

module.exports = server;
