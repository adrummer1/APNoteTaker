// Establish parameters for unique IDs to apply to new notes
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);