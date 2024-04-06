const { Schema, model } = require("mongoose");

const entrySchema = new Schema({
  gratefulFor: [
    {
      type: String,
      required: true,
    },
  ],
  dailyAffirmations: [
    {
      type: String,
      required: true,
    },
  ],
  ultimateAffirmation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Entry = model("Entry", entrySchema);

module.exports = Entry;
