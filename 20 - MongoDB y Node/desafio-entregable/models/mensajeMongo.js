const mongoose = require('mongoose');

const schema = mongoose.Schema({
    text: { type: String, max: 400 },
    author: { type: String, require: true, max: 100 },
    date: { type: Date, default: new Date() }
});

const mensajesMongo = mongoose.model('mensajes', schema);

module.exports = mensajesMongo;