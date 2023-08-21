const store = require('../helpers/store');
const express = require('express');

const apiRouter = require('./apiroutes');
const htmlRouter = require('./htmlroutes');

const app = express();

app.use('/apiroutes', apiRouter);
app.use('/htmlroutes', htmlRouter);

module.exports = app;