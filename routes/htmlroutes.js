const html = require('express').Router();

html.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
  });
  
  html.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  module.exports = html;