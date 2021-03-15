const mongoose = require("mongoose");
const userModel = require("./user.model");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    amount: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    discriminatorKey: 'productType'
});


let Product = mongoose.model('Product', ProductSchema);

let EjuiceProduct = Product.discriminator('Ejuice', new Schema({
    Ejuice: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        taste: {
            type: String,
            required: true
        },
        vg: {
            type: Number,
            required: true
        },
        pg: {
            type: Number,
            required: true
        },
        nicotine: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }
    },
}))

let CoilProduct = Product.discriminator('Coil', new Schema({
    Coil: {
        name: {
            type: String,
            required: true
        },
        resistance: {
            type: [Number],
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        },
    }
}))

let ModProduct = Product.discriminator('Mod', new Schema({
    Mod: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        colour: {
            type: [String],
            required: true
        },
        wattage: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }

    }
}))

let BatteryProduct = Product.discriminator('Battery', new Schema({
    Battery: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        batteryType: {
            type: Number,
            required: true
        },
        batteryLife: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }
    }
}))

let TankProduct = Product.discriminator('Tank', new Schema({
    Tank: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        capacity: {
            type: Number
        },
        tankType: {
            type: String,
            enum: ['RBA', 'RTA', 'RDA', 'Tank'],
            required: true
        },
        colour: {
            type: [String],
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }
    }
}))

let AromaProduct = Product.discriminator('Aroma', new Schema({
    Aroma: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        taste: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }
    }
}))

let BaseProduct = Product.discriminator('Base', new Schema({
    Base: {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        vg: {
            type: Number,
            required: true
        },
        pg: {
            type: Number,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        productInformation: {
            type: String,
            required: true
        }
    }
}))

module.exports = {
    Product,
    EjuiceProduct,
    CoilProduct,
    TankProduct,
    AromaProduct,
    BaseProduct,
    ModProduct,
    BatteryProduct
}