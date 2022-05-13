let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    quantity: {
        type: String,
        default: ''
    },
});
let product = new mongoose.model('Product', schema);
module.exports = product;