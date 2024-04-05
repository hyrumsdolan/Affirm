const { Schema, model } = require('mongoose');

const dreamSchema = new Schema({
  bigDream: {
    type: String,
  },
  littleDreams: [
    {
        type: Schema.Types.ObjectId,
        ref: 'LittleDreams',
    },
  ],
  ultimateGoal: {
    type: String,
  },
});

const Dream = model('Dream', dreamSchema);

module.exports = Dream;