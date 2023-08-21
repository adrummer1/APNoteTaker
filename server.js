const fs = require("fs");
const express = require("express");
const app = express();
// const path = require('path');

app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/dn/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = generateUniqueId();
      notes.push(newNote);
      fs.writeFile(__dirname + "db/dn.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: `Internal server error` });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
