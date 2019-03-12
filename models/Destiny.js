/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinySchema = new Schema({
    name: String,
    venues: []
}, { timestamps: true });

const Destiny = mongoose.model('Destiny', destinySchema);
module.exports = Destiny;