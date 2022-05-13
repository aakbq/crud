let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});
let manager = new mongoose.model('Manager', schema);
module.exports = manager;