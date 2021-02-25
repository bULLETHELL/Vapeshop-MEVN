// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./post.route');
const e_juiceRoute = require('./e_juice.route');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

const Post = require('./post.model')
const E_juice = require('./e_juice.model')

AdminBro.registerAdapter(AdminBroMongoose)

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const adminBro = new AdminBro({
    resources: [E_juice],
    rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/posts', postRoute);
app.use('/e_juices', e_juiceRoute);
app.use(adminBro.options.rootPath, router)

app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT);
});