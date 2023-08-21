const fs = require("fs");
const express = require("express");
const app = express();
const uuid = require("./public/assets/uuid");

app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/notes", (req, res) => {
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

app.post("/api/notes", (req, res) => {
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
