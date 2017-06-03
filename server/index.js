require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const httpServer = require('./http-server');
const PORT = process.env.HTTP_PORT;

// We have to require this so it attaches to the HTTP server.
require('./web-socket-server');

// Serve files statically from the public/ directory of this project.
app.use( express.static('public') );

// If no filename provided, redirect to the index.
app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname, '../public', 'index.htm') );
});

// Placeholder. TODO fix this.
app.use( (req, res) => {
  res.send(`You requested <strong>${req.url}</strong>.`);
});

httpServer.on('request', app);
httpServer.listen( PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
