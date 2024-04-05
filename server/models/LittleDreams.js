const { Schema, model } = require('mongoose');

const littleDreamsSchema = new Schema({
    littleDream:{
        type: String,
    },
    selected:{
        type: Boolean,
        default: false,
    }
});

const LittleDreams = model('LittleDreams', littleDreamsSchema);

module.exports = LittleDreams;