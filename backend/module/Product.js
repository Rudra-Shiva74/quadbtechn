const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    height: {
        type: String
    },
    width: {
        type: String
    },
    image: {
        type: Array
    },
    discount: {
        type: Number
    },
    addistiondetails: {
        type: String
    },
    originnalPrice: Number,
    qnt: Number
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;