const mongoose = require('mongoose');

const schema = mongoose.Schema({
    text: { type: String, require: true, max: 400 },
    author: { type: String, require: true, max: 100 },
    date: { type: String, require: true, default: new Date() }
});

const mensajesMongo = mongoose.model('mensajes', schema);

module.exports = mensajesMongo;