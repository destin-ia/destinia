/*jshint esversion: 6 */

const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => res.render("auth/login", { errorMessage: `` }));

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        res.render('auth/login', { errorMessage: 'Enter both email and password to log in.' });
        return;
    }

    User.findOne({ email }, (err, theUser) => {
        if (err || theUser === null) {
            res.render('auth/login', { errorMessage: `There isn't an account with email ${email}.` });
            return;
        }
        if (!bcrypt.compareSync(password, theUser.password)) {
            res.render('auth/login', { errorMessage: 'Invalid password.' });
            return;
        }
        req.session.currentUser = theUser;
        res.redirect('/user/dashboard');
    });
});

router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/');
        return;
    }

    req.session.destroy((err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/');
    });
});

router.get("/signup", (req, res, next) => res.render("auth/signup", { errorMessage: `` }));

router.post("/signup", (req, res, next) => {
    const { username, email, password } = req.body;
    if (username === `` || email === `` || password === ``) {
        res.render("auth/signup", { errorMessage: `Enter all the fields to sign up.` });
        return;
    }

    User.findOne({ email }, "_id", (err, existingUser) => {
        if (err) {
            next(err);
            return;
        }

        if (existingUser !== null) {
            res.render("auth/signup", { errorMessage: `The email ${ email } already exists` });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashPass
        });

        newUser.save()
            .then(() => res.redirect("/"))
            .catch(err => res.render("auth/signup", { errorMessage: "Something went wrong. Try again." }));
    });
});

module.exports = router;