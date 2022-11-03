const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    }
}, { timeStamps: true })

const Image = mongoose.model('image', fileSchema);
module.exports = Image;