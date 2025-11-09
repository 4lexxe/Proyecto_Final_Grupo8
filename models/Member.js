const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, trim: true },
  image: { type: String, trim: true }
});

module.exports = mongoose.model('Member', memberSchema);
