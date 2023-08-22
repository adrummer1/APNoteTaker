const express = require("express");
const path = require('path');
const api = require('./routes/apiroutes.js');
const html = require('./routes/htmlroutes.js');
const store = require('./helpers/store');

const PORT = 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', api);
app.use('/', html);

app.post('/notes', (req, res) => {
    try {
        store.saveNote(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: `${saveNote} could not be added.` })
    }   
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
