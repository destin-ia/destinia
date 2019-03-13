/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    id: String,
    name: String,
    contact: {
        phone: String,
        formattedPhone: String,
        twitter: String,
        instagram: String,
        facebook: String,
        facebookUsername: String,
        facebookName: String
    },
    location: {
        address: String,
        crossStreet: String,
        lat: Number,
        lng: Number,
        postalCode: String,
        cc: String,
        city: String,
        state: String,
        country: String,

        distance: Number // in meters
    },
    categories: [],
    verified: { type: Boolean },
    stats: {
        checkinsCount: Number,
        usersCount: Number,
        tipCount: Number
    },
    url: String,
    hours: String,
    popular: String,
    menu: String,
    price: {
        tier: Number,
        message: String
    },
    rating: Number,
    hereNow: String,
    storeId: String,
    description: String,
    createdAt: String,
    mayor,
    tips,
    listed,
    beenHere,
    shortUrl,
    canonicalUrl,
    photos,
    likes,
    like,
    dislike,
    phrases,
    attributes,
    roles,
    page
}, { timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;