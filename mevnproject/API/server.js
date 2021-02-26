// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./routes/post.route');
const e_juiceRoute = require('./routes/e_juice.route');
const addressRoute = require('./routes/address.route')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const bcrypt = require('bcrypt')

const Post = require('./models/post.model')
const E_juice = require('./models/e_juice.model')
const User = require('./models/user.model')

AdminBro.registerAdapter(AdminBroMongoose)

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
)

const adminBro = new AdminBro({
    resources: [E_juice, {
        resource: User,
        options: {
            properties: {
                encryptedPassword: {
                    isVisible: false,
                },
                password: {
                    type: 'string',
                    isVisible: {
                        list: false,
                        edit: true,
                        filter: false,
                        show: false,
                    },
                },
            },
            actions: {
                new: {
                    before: async(request) => {
                        if (request.payload.password) {
                            request.payload = {
                                ...request.payload,
                                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                                password: undefined,
                            }
                        }
                        return request
                    },
                }
            }
        }
    }],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async(email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'secret-password',
})

app.use('/e_juices', e_juiceRoute);
app.use('/addresses', addressRoute);
app.use('/posts', postRoute)
app.use(adminBro.options.rootPath, router)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT)
})