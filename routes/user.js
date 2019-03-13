/*jshint esversion: 6 */
const express = require("express");
const passport = require('passport');
const Router = express.Router();
const User = require("../models/User");
const axios = require("axios");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

Router.get("/dashboard", (req, res, next) => res.render("user/dashboard", { errorMessage: `` }));

Router.post("/dashboard", (req, res, next) => {
    axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20190202&near=${req.body.place}&radius=${req.body.RADIUS}`) //&v=20120609
        // axios.get(`https://api.foursquare.com/v2/venues/suggestcompletion?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20180323&limit=50&near=${req.body.place}&radius=${req.body.RADIUS}&query=historic`)
        .then(response => {
            console.log(`Response from the API is: `, response.data.response.venues);
            res.json(response.data.response.venues)
        })
        .catch(err => next(err));
});

module.exports = Router;