var mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
});

const ProductoMongo = mongoose.model('ProductosDesafio', schema);

module.exports = ProductoMongo;