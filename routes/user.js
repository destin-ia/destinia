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

Router.get("/dashboard", (req, res, next) => {
    User.find()
        .populate() //UNDER CONSTRUCTION
        .then(user => {
            res.render("user/dashboard", { user, errorMessage: `` })
        })
        .catch(err => console.log(err))
});

// Router.get("/profile", (req, res, next) => res.render("user/profile", { errorMessage: `` }));
Router.get("/places/:id", (req, res, next) => {
    // console.log(typeof req.params.id)
    let myId = req.params.id
    axios.get(`https://api.foursquare.com/v2/venues/${myId}?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202`) //&v=20120609
        .then(response => {
            console.log(`Response from the API is: `, response.data.response.venue);
            res.render("user/places", { venue: response.data.response.venue, JSONvenue: JSON.stringify(response.data.response.venue.location) });
        })
        .catch(err => next(err));
    // res.render("user/places/:id", { errorMessage: `` })


    axios.get(`https://api.foursquare.com/v2/venues/${myId}/photos?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202`) //&v=20120609
        .then(response => {
            console.log(`Response from the API is: `, response.data.response.photos.items);
            res.render("user/places", { photo: response.data.response.photos.items, JSONphoto: JSON.stringify(response.data.response.photos.items) });
        })
        .catch(err => next(err));

});

Router.post("/dashboard", (req, res, next) => {

    axios.all([
            axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}&categoryId=${req.body.filter}`),
            axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}&categoryId=${req.body.filter}`)
        ])
        .then(axios.spread((response1, resopnse2) => {

            console.log("Respuesta 1", response1)
            console.log("Respuesta 2", resopnse2)
                // do something with both responses
        }));

    // axios.all([
    //     axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}&categoryId=${req.body.filter}`),
    //     axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}&categoryId=${req.body.filter}`)
    //     ]).then((axios.spread(resonse1, response2)) => {


    //     }

    //         // console.log(`Response from the API is: `, response.data.response.venues);
    //         // res.json(response.data.response.venues);
    //     )
    //     .catch(err => next(err));

    // axios.get(`https://api.foursquare.com/v2/venues/${myId}/photos?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202`) //&v=20120609
    //     .then(response => {
    //         console.log(`Response from the API is: `, response.data.response.photos.items);
    //         res.render("user/places", { photo: response.data.response.photos.items, JSONphoto: JSON.stringify(response.data.response.photos.items) });
    //     })
    //     .catch(err => next(err));


});

Router.get("/profile/:id", (req, res, next) => {
    //console.log(req.params.id);
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
            res.redirect("/not-found");
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