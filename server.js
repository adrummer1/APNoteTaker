// Importing express
const express = require("express");
const path = require('path');
// Importing route files for api and html
const api = require('./routes/apiroutes.js');
const html = require('./routes/htmlroutes.js');

// Configuring PORT for Heroku
const PORT = process.env.PORT || 3001;

// Launch express
const app = express();

// Sets up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
