const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let E_juice = new Schema(
    {
        name: {
            type: String,
        },
        amount:{
            type: Number,
        },
        taste: {
            type: String,
        },
        vg: {
            type: Number,
        },
        pg: {
            type: Number,
        },
        nicotine: {
            type: Number,
        },
        price:{
            type: Number
        }
    },
    {
        collection: "e_juices",
    }
);
module.exports = mongoose.model("E_juice", E_juice);
