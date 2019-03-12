/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    id: String,
    name: String,
    contact: {
        twitter: String,
        phone: String,
        formattedPhone: String
    },
    location: {
        address: String,
        crossStreet: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        lat: Number,
        lng: Number,
        distance: Number // in meters
    },
    categories: [String],
    stats: {
        checkinsCount: Number,
        usersCount: Number,
        tipCount: Number
    },
    url: String,
    hours: String,
    popular: String
}, { timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;