const PORT = 8080;

const express = require('express');
const app = express();
const path = require('path');

const httpServer = require('./http-server');
const wsServer = require('./web-socket-server');

app.use( express.static('public') );

app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname, '../public', 'index.htm') );
});

app.use( (req, res) => {
  res.send(`You requested <strong>${req.url}</strong>.`);
});

httpServer.on('request', app);
httpServer.listen( PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
