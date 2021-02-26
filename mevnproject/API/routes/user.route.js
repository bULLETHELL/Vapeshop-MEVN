//  user.route.js

const express = require("express")
const userRoute = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

userRoute.route('/add').post(function(req, res) {
    console.log(req.body)
    let user = new User({
        email: req.body.email,
        encryptedPassword: bcrypt.hashSync(req.body.password, 10),
        address: req.body.address,
        zipCode: req.body.zipCode,
        city: req.body.city,
        role: 'normal'
    })
    user.save().then(() => {
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }) // expires in 24 hours
        res.status(200).send({ auth: true, token: token, user: user })
    }).catch(() => {
        res.status(500).send("There was a problem registering the user.")
    })
})

userRoute.route('get').post(function(req, res) {})

module.exports = userRoute;