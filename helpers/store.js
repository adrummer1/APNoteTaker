const util = require('util');
const fs = require('fs');

const uuid = require('../helpers/uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
 read() {
  return readFileAsync('db/db.json', 'utf8');
 }


 addNote(note) {
  const { title, text } = note;

  if (!title || !text) {
   throw new Error("Note 'title' and 'text' cannot be blank");
  }

  // Add a unique id to the note using uuid package
  const newNote = { title, text, id: uuid() };
  this.write(newNote);
 }

 write(note) {
    return this.read()
    .then((data) => {
        const notes = JSON.parse(data) || [];
        notes.push(note);
        return writeFileAsync('db/db.json', JSON.stringify(notes));
    })
    .catch((error) => {
        throw new Error (`Error writing note: ${error}`);
    })
 }

 getNotes() {
    return this.read()
    .then((data) => {
        const notes = JSON.parse(data) || [];
        return notes;
    })
    .catch((error) => {
        throw new Error (`Error getting notes: ${error}`);
    })
 }

 removeNote() {
    return this.read()
    .then((data) => {
        const notes = JSON.parse(data) || [];
        const updatedNotes = notes.filtert((note) => note.id !=id);
        return writeFileAsync('db/db.json', JSON.stringify(updatedNotes));
    })
    .catch((error) => {
        throw new Error (`Error removing notes: ${error}`);
    });
 }
}

module.exports = new Store();