const express = require("express");
const path = require('path');
const api = require('./routes/index');

const PORT = 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', api);

app.get('/htmlroutes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/apiroutes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);    

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
