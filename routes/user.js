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

Router.post("/dashboard/geocode", (req, res, next) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.geocode}.json?access_token=pk.eyJ1IjoibWFrZXJkZXYiLCJhIjoiY2p0M2E3czQ1MW8zNzQ0cGF3aWhqbmM0NSJ9.LsxCUIsThXEOpzlW233seg`)
        .then(response => {
            const postGeo = {
                posGeocodeLat: response.data.features[0].center[0],
                posGeocodeLon: response.data.features[0].center[1]
            };
            res.json(postGeo);
        })
        .catch(err => next(err));
    axios.get(`https://api.foursquare.com/v2/venues/search?client_id=${process.env.CLIENTID}&client_secret=${process.env.SECRET}&v=20180323&limit=50&near=${req.body.geocode}`)
        .then(response => {
            console.log(`Response from the API is: `, response.data.response.venues);
        })
        .catch(err => next(err));
});

Router.post("/dashboard/routeinit", (req, res, next) => {
    const { lat, lon } = req.body;
    console.log(req.body);
    // res.json()
});

module.exports = Router;