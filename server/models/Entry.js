const { Schema, model } = require('mongoose');


const entrySchema = new Schema({
  gratefulFor: [{
    type: String,
    required: true,
  }],
  dailyAffirmations: [{
    type: String,
    required: true,
  }],
  ultimateAffirmation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;