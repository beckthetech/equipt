const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categories: [],
    zipcode: String,
    name: String,
    description: String,
    price: String,
    photo: String
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);