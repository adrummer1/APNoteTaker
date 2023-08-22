const express = require('express');
const store = require('../helpers/store');

const apiRouter = require('./apiroutes');
const htmlRouter = require('./htmlroutes');

const app = express();

app.use('/apiroutes', apiRouter);
app.use('/htmlroutes', htmlRouter);

app.post('/api/notes', (req, res) => {
    try {
        store.saveNote(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: `${saveNote} could not be added.` })
    }   
});

app.post('/api/notes/write', (req, res) => {
    try {
        store.write(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: `${write} could not be added.` })
    }   
});

app.post('/api/notes/get', (req, res) => {
    try {
        const notes = store.getNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: `${getNotes} could not be added.` })
    }   
});

app.post('/api/notes/delete', (req, res) => {
    try {
        store.deleteNote();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: `${removeNote} could not be deleted.` })
    }   
});

module.exports = app;