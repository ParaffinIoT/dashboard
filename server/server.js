require("dotenv").config();
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: "src", dev });
const handler = app.getRequestHandler();
const { Config } = require("./config");

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());

  server.get("*", (req, res) => {
    return handler(req, res);
  });
  server.listen(Config("PORT"), err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${Config("PORT")}`);
  });
});
