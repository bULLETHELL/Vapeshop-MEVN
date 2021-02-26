const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Post
let User = new Schema({
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'restricted'],
        required: true
    },
}, {
    collection: "users",
})

module.exports = mongoose.model("User", User);