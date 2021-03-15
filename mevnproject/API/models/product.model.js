const mongoose = require("mongoose");
const userModel = require("./user.model");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({ 
    amount: String,
    price:{
        type: Number
    },
    },
    { 
        discriminatorKey: 'productType' 
    });


let Product = mongoose.model('Product', ProductSchema);

let EjuiceProduct = Product.discriminator('Ejuice', new Schema({
    Ejuice: {
            name: {
                type: String,
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
            brand:{
                type: String,
            },
            productInformation: String
        },
  }))

let CoilProduct = Product.discriminator('Coil', new Schema({
    Coil:{
        name: String,
        ohm: [Number],
        brand: String,
        productInformation: String,
    }
}))

module.exports = {
    EjuiceProduct, 
    CoilProduct
}


