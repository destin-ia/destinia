/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinySchema = new Schema({
    name: String,
    venuesId: [{ type: Schema.Types.ObjectId, ref: 'Venue' }]
}, { timestamps: true });

const Destiny = mongoose.model('Destiny', destinySchema);
module.exports = Destiny;