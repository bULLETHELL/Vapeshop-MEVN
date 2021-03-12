const express = require("express");
const { restart } = require("nodemon");
const productRoutes = express.Router();

// Require E_juice model in our routes module
let Product = require("../models/Product.model");

//add a product to the database
productRoutes.route("/add").post(function(req, res){
    let product = new Product(req.body)
    product.save().then(()=> {
        res.status(200).json({
            business: "business in added succesfully",
        })
    }).catch(()=> {
        res.status(400).send("unable to save to database")
    })
})

//get all products in the database
productRoutes.route('/getall').get(function(req, res){
    Product.find(function(err, products){
        if (err){
            res.json(err)
        }
        else{
            res.json(products)
        }
    })
})

//get all products of given type
productRoutes.route('/getbytype/:type').get(function(req, res){
    let type = req.params.type
    Product.find({type: type}, function(err, products){
        if (err){
            res.json(err)
        }
        else{
            res.json(products)
        }
    })

})