const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema(
    {
        orderingCustomer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        orderDate: {
            type: Date,
        },
        products: {
            type: Array,
        },
        deliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }
    },
    {
        collection: "orders",
    }
);

module.exports = mongoose.model("Order", Order);
