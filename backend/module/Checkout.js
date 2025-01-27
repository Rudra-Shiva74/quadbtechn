const mongoose = require('mongoose');
const checkoutShema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    cartid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "usercards"
    },
    user: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    fname: String,
    lname: String,
    phone: {
        type: Number,
        required: true
    },
    streataddress: {
        type: String,
        required: true,

    },
    country: {
        type: String,
        required: true,
    },
    towncity: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    ordered: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    }

});

const Checkouts = mongoose.model('checkouts', checkoutShema);
module.exports = Checkouts;