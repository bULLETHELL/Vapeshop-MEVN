// post.model.js

const express = require("express");
const e_juiceRoutes = express.Router();

// Require E_juice model in our routes module
let E_juice = require("./post.model");

// Defined store route
e_juiceRoutes.route("/add").post(function(req, res) {
    let post = new E_juice(req.body);
    post.save()
        .then(() => {
            res.status(200).json({
                business: "business in added successfully",
            });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
e_juiceRoutes.route("/").get(function(req, res) {
    E_juice.find(function(err, posts) {
        if (err) {
            res.json(err);
        } else {
            res.json(posts);
        }
    });
});

// Defined edit route
e_juiceRoutes.route("/edit/:id").get(function(req, res) {
    let id = req.params.id;
    E_juice.findById(id, function(err, post) {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
});

//  Defined update route
e_juiceRoutes.route("/update/:id").post(function(req, res) {
    E_juice.findById(req.params.id, function(err, post) {
        if (!post) res.status(404).send("data is not found");
        else {
            post.name = req.body.name;
            post.taste = req.body.taste;
            post.vg = req.body.vg;
            post.pg = req.body.pg;
            post.nicotine = req.body.nicotine;
            post.save()
                .then(() => {
                    res.json("Update complete");
                })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
e_juiceRoutes.route("/delete/:id").delete(function(req, res) {
    E_juice.findByIdAndRemove({ _id: req.params.id }, function(err) {
        if (err) res.json(err);
        else res.json("Successfully removed");
    });
});

module.exports = e_juiceRoutes;
