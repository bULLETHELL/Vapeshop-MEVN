//  user.route.js

const express = require("express")
const userRoute = express.Router()
const User = require('../models/user.model')
const Order = require('../models/order.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { auth } = require('../middlewares/auth')

userRoute.route('/add').post(function(req, res) {
    const newuser = new User({
        email: req.body.email,
        encryptedPassword: req.body.password,
        address: req.body.address,
        zipCode: req.body.zipCode,
        city: req.body.city,
        role: req.body.role
    })
    User.findOne({ email: newuser.email }, function(err, user) {
        if (user) return res.status(400).json({ auth: false, message: "user already exists" })

        newuser.save((err, doc) => {
            if (err) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({
                success: true,
                user: doc
            })
        })
    })
})

userRoute.route('/login').post(function(req, res) {
    let token = req.cookies.auth
    User.findByToken(token, (err, user) => {
        if (err) return res(err)
        if (user) return res.status(400).json({
            error: true,
            message: "You are already logged in"
        })
        else {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' })

                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.json({ isAuth: false, message: "Wrong password" })

                    user.generateToken((err, user) => {
                        if (err) {
                            return res.status(400).send(err)
                        }

                        res.cookie('auth', user.token).json({
                            isAuth: true,
                            id: user._id,
                            email: user.email
                        })
                    })
                })
            })
        }
    })
})

userRoute.route('/profile').get(auth, function(req, res) {
    Order.find({ 'orderingCustomer.email': req.user.email }, function(err, order) {
        if (err) res.json(err)
        else {
            res.json({
                isAuth: true,
                id: req.user._id,
                email: req.user.email,
                order: order
            })
        }
    })
})

//logout user
userRoute.route('/logout').get(auth, function(req, res) {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });

});

module.exports = userRoute;