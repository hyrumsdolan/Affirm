const { Schema } = require('mongoose');

const entrySchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
        },
    },
);

module.exports = entrySchema;
