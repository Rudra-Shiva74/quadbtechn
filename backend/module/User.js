const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    username: {
        type: String,
        required: true,
        unique: true,
    }
});
const usercardSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    product: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    order: {
        type: Boolean,
        default: false
    }
});


const usercardModel = new mongoose.model("usercards", usercardSchema);
const userModel = new mongoose.model("users", userSchema);
module.exports = {
    userModel,
    usercardModel
}
