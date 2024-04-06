const { Schema, model } = require("mongoose");

const dreamSchema = new Schema({
  bigDream: {
    type: String,
    // default: null,
    // required: true,
  },
  littleDreams: [
    {
      type: Schema.Types.ObjectId,
      ref: "LittleDreams",
    },
  ],
  ultimateGoal: {
    type: String,
    // default: null,
    // required: true,
  },
});

const Dream = model("Dream", dreamSchema);

module.exports = Dream;
