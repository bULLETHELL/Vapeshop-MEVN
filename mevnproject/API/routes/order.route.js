// post.model.js

const express = require("express");
const orderRoutes = express.Router();

// Require Order model in our routes module
let Order = require("../models/order.model");

// Defined store route
orderRoutes.route("/add").post(function(req, res) {
    console.log(req.body)
    let order = new Order({
        orderDate: req.body.orderDate,
        products: req.body.products,
        deliveryAddress: {
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
        },
        orderingCustomer: {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
        },
    })
    order.save()
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
orderRoutes.route("/").get(function(req, res) {
    Order.find(function(err, posts) {
        if (err) {
            res.json(err);
        } else {
            res.json(posts);
        }
    });
});

// Defined edit route
orderRoutes.route("/edit/:id").get(function(req, res) {
    let id = req.params.id;
    Order.findById(id, function(err, post) {
        if (err) {
            res.json(err);
        }
        res.json(post);
    });
});

//  Defined update route
orderRoutes.route("/update/:id").post(function(req, res) {
    Order.findById(req.params.id, function(err, post) {
        if (!post) res.status(404).send("data is not found");
        else {
            post.orderingCustomer = req.body.orderingCustomer;
            post.orderDate = req.body.orderDate;
            post.products = req.body.products;
            post.deliveryAddress = req.body.deliveryAddress;
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
orderRoutes.route("/delete/:id").delete(function(req, res) {
    Order.findByIdAndRemove({ _id: req.params.id }, function(err) {
        if (err) res.json(err);
        else res.json("Successfully removed");
    });
});

module.exports = orderRoutes;
