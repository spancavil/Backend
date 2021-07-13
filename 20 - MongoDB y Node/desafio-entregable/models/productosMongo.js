const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, require: true, max: 400 },
    price: { type: Number, require: true, max: 1000000 },
    thumbnail: { type: String, require: true, max: 400 }
})

const productosMongo = mongoose.model('productos', schema);

module.exports = productosMongo;