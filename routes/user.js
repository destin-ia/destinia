/*jshint esversion: 6 */

const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const axios = require("axios")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;



module.exports = router;