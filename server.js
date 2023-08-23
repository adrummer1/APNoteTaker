const express = require("express");
const path = require('path');
const api = require('./routes/apiroutes.js');
const html = require('./routes/htmlroutes.js');
const store = require('./helpers/store');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api', api);
app.use('/', html);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
