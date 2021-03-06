// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const e_juiceRoute = require('./routes/e_juice.route');
const addressRoute = require('./routes/address.route')
const orderRoute = require('./routes/order.route')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const E_juice = require('./models/e_juice.model')
const User = require('./models/user.model')
const Order = require('./models/order.model')
const Address = require('./models/address.model')
const { EjuiceProduct, CoilProduct, TankProduct, AromaProduct, BaseProduct, ModProduct, BatteryProduct } = require('./models/product.model')

AdminBro.registerAdapter(AdminBroMongoose)

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
)

const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role == 'admin'

const adminBro = new AdminBro({
    resources: [
        Order,
        Address,
        EjuiceProduct,
        CoilProduct,
        TankProduct,
        AromaProduct,
        BaseProduct,
        ModProduct,
        BatteryProduct,
        {
            resource: User,
            options: {
                properties: {
                    encryptedPassword: {
                        isVisible: false,
                    }
                    /*,
                                        password: {
                                            type: 'string',
                                            isVisible: {
                                                list: false,
                                                edit: true,
                                                filter: false,
                                                show: false,
                                            },
                                        },
                                        */
                },

                actions: {
                    /* new: {
                        before: async(request) => {
                            if (request.payload.password != "") {
                                request.payload = {
                                    ...request.payload,
                                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                    password: undefined,
                                }
                            }
                            return request
                        },
                    }, */
                    edit: { isAccessible: canModifyUsers },
                    delete: { isAccessible: canModifyUsers },
                    new: { isAccessible: canModifyUsers },
                },
            }
        }
    ],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async(email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched
                /* && user.role != "normal"*/
            ) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'secret-password',
})

app.use(cors({
    origin: [
        "http://localhost:8080",
        "http://localhost:4000",
        "http://localhost:8081"
    ],
    credentials: true
}))
app.use(cookieParser())
app.use(adminBro.options.rootPath, router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/e_juices', e_juiceRoute);
app.use('/orders', orderRoute);
app.use('/addresses', addressRoute);
app.use('/user', userRoute)
app.use('/products', productRoute)

app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT)
})