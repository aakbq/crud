let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: String,
        required: true,
        default: ''
    },
    quantity: {
        type: String,
        required: true,
        default: ''
    },
});
let product = new mongoose.model('Product', schema);
module.exports = product;