const PORT = 8080;

const app = require("express")();
const httpServer = require("./http-server");
const wsServer = require("./web-socket-server");

app.use( (req, res) => {
  res.send(`You requested <strong>${req.url}</strong>.`);
});

httpServer.on("request", app);
httpServer.listen( PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
