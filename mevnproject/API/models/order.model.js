const mongoose = require("mongoose");
const userModel = require("./user.model");
const Schema = mongoose.Schema;
let Order = new Schema(
    {
        orderDate: Date,
        products: [Object],
        deliveryAddress: {
            address: String,
            city: String,
            postalCode: Number,
        },

        orderingCustomer: {
            fullName: String,
            phoneNumber: Number,
            email: String,
        },
    },
    {
        collection: "orders",
    }
);

module.exports = mongoose.model("Order", Order);
