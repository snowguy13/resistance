var WebSocketServer = require("ws").Server,
    server,
    OPTIONS = {
      port: 80
    };



module.exports = {
  start: () => {
    server = new WebSocketServer( OPTIONS );
  }
};
