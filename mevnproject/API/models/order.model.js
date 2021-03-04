const mongoose = require("mongoose");
const userModel = require("./user.model");
const Schema = mongoose.Schema;
const address = "./address.model.js";
let Order = new Schema(
    {
        orderDate: Date,
        products: [Object],
        deliveryAddress: {
            address: String,
            city: String,
            postalCode: Number,
        },

        orderingUser: userModel.schema,
    },
    {
        collection: "orders",
    }
);

module.exports = mongoose.model("Order", Order);
