const mongoose = require("mongoose");
const userModel = require("./user.model");
const Schema = mongoose.Schema;

let Product = new Schema({
    amount: Number,
    type: {
        type: String,
        enum: ['E_juice', 'Coil', 'Base', 'Mod'],
        required: true
    },
    Product: Object,
})