/*jshint esversion: 6 */
require('dotenv').config();
const express = require("express");
const passport = require('passport');
const Router = express.Router();
const User = require("../models/User");
const axios = require("axios");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// API FourSquare




// RENDER Vistas --------------------------------

Router.get("/dashboard", (req, res, next) => res.render("user/dashboard", { errorMessage: `` }));
// Router.get("/profile", (req, res, next) => res.render("user/profile", { errorMessage: `` }));
Router.get("/places", (req, res, next) => res.render("user/places", { errorMessage: `` }));

Router.post("/dashboard", (req, res, next) => {
    axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}&categoryId=${req.body.filter}`) //&v=20120609
        .then(response => {
            console.log(`Response from the API is: `, response.data.response.venues);
            res.json(response.data.response.venues);
        })
        .catch(err => next(err));
});
Router.get("/profile/:id", (req, res, next) => {
    console.log(req.params.id);
    User.findById(req.params.id)
        .then(user => {

            res.render("user/profile", { user });
        })
        .catch(err => {
            console.log('Error while finding a celebrity to edit', err);
            next();
        });
});

// CRUD Usuarios ---------------------------------

Router.get("/delete/:id", (req, res, next) => {

    User.findByIdAndRemove(req.params.id)
        .then(user => {
            console.log("He borrado el usuario " + user);
            req.session.destroy();
            res.redirect("/");
        })
        .catch(err => {
            console.log('Error deleting an user', err);
            next();
        });
});


Router.post("/profile/:id", (req, res, next) => {
    const { name, username, password, photo } = req.body;
    console.log(req.body);
    User.update({ _id: req.params.id }, { $set: { name, username, password, photo } })
        .then(user => res.redirect(`${req.params.id}`))
        .catch(err => {
            console.log('Error while updating an user', err);
            next();
        });
});

Router.post("/profile/bio/:id", (req, res, next) => {
    const { bio } = req.body;
    console.log(req.body);
    User.update({ _id: req.params.id }, { $set: { bio } })
        .then(user => res.redirect(`../${req.params.id}`))
        .catch(err => {
            console.log('Error while updating an user', err);
            next();
        });
});

module.exports = Router;