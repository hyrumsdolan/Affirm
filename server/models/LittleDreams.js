const { Schema, model } = require('mongoose');

const littleDreamsSchema = new Schema({
    littleDream:{
        type: String,
        required: true,
    },
    selected:{
        type: boolean,
        required: true,
        default: false,
    }
});

const LittleDreams = model('LittleDreams', littleDreamsSchema);

module.exports = LittleDreams;