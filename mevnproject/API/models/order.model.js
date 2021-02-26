const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema(
    {
        orderingCustomer: {
            type: String,
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
