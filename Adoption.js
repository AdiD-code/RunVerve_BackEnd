const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  treeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree', required: true },
});

module.exports = mongoose.model('Adoption', adoptionSchema);
