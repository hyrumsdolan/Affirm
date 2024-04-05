const { Schema, model } = require('mongoose');

const dreamSchema = new Schema({
  bigDream: {
    type: String,
    required: true,
  },
  littleDreams: [
    {
        type: Schema.Types.ObjectId,
        ref: 'LittleDreams',
    },
  ],
  ultimateGoal: {
    type: String,
    required: true,
  },
});

const Dream = model('Dream', dreamSchema);

module.exports = Dream;