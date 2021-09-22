var mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
});

const Product = mongoose.model('Product', schema);

module.exports = Product;