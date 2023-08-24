const fs = require("fs");
// Set api vaiable and importing Router
const api = require('express').Router();
// Importing unique ID parameters for notes
const uuid = require('../helpers/uuid');

// Establishing GET command for notes
api.get("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: `Error reading file: ${err}` });
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });
  
  // Establishing POST instructions for adding new notes in the application
  api.post("/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
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
        fs.writeFile("db/db.json", JSON.stringify(notes, null, 4), (err) => {
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

// Establishing DELETE instructions to remove notes based on unique ID
api.delete("/notes/:id", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: `Error reading file: ${err}` });
    } else {
      const notes = JSON.parse(data);
      const updatedNotes = notes.filter( (note) => {return note.id != req.params.id});
      fs.writeFile("db/db.json", JSON.stringify(updatedNotes, null, 4), (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: `Error writing file: ${err}` });
        } else {
          res.json(updatedNotes);
        }
      });
    }
  });
})

  module.exports = api