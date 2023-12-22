const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Tree', treeSchema);
