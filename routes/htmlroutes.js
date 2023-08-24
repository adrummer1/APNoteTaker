const path = require('path');
// Establising html variable and importing Router
const html = require('express').Router();

// Establishing GET call to access notes.html
html.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Establishing wildcard GET call to access index.html
  html.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  module.exports = html;