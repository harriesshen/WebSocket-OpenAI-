import express from "express";
import ws from "./websocket.js";
import api from "./api.js";
//import http from "http";
const app = express();

const PORT = 3000;
const server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(" Listening on http://%s:%s", host, port);
  console.log(`Listening on ${PORT}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", api);
ws(server);
