

const express = require("express")
const e_juiceRoutes = express.Router()

//Require E_juice model in routes module
let E_juice = require("./e_juice.model")

// Defined get data(index or listing) route
e_juiceRoutes.route("/").get(function(req, res) {
    Post.find(function(err, e_juices) {
        if (err) {
            res.json(err);
        } else {
            res.json(e_juices);
        }
    });
});