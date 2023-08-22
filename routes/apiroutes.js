const fs = require("fs");
const api = require('express').Router();
const uuid = require('../helpers/uuid');


api.get("/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Error reading file: ${err}` });
      } else {
        console.log(data);  
        const notes = JSON.parse(data);
        console.log(notes);
        res.json(notes);
      }
    });
  });
  
  api.post("/notes", (req, res) => {
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Error reading file: ${err}` });
      } else {
        const notes = JSON.parse(data);
        const newNote = {
          title: req.body.title,
          text: req.body.text,
          id: uuid(),
        };
        notes.push(newNote);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: `Error writing file: ${err}` });
          } else {
            res.json(newNote);
          }
        });
      }
    });
  });

  module.exports = api