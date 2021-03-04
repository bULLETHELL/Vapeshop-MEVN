const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config")
const salt = 10

// Define collection and schema for Post
let User = new Schema({
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'restricted', 'normal'],
        required: true
    },
    token: {
        type: String
    }
}, {
    collection: "users",
})

User.pre('save', function(next) {
    var user = this

    if (user.isModified('encryptedPassword')) {
        bcrypt.genSalt(salt, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.encryptedPassword, salt, function(err, hash) {
                if (err) return next(err)
                user.encryptedPassword = hash
                next()
            })
        })
    } else {
        next()
    }
})

User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.encryptedPassword, function(err, isMatch) {
        if (err) return cb(next)
        cb(null, isMatch)
    })
}

User.methods.generateToken = function(cb) {
    var user = this
    var token = jwt.sign(user._id.toHexString(), config.SECRET)

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

User.methods.deleteToken = function(token, cb) {
    var user = this
    user.update({ $unset: { token: 1 } }, function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

// find by token
User.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, config.SECRET, function(err, decode) {
        user.findOne({ "_id": decode, "token": token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
};

module.exports = mongoose.model("User", User);