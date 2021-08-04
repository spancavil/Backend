const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: {
        email: {type: String, required: true, max: 300},
        nombre: {type: String, required: true, max: 300},
        apellido: {type: String, required: true, max: 300},
        edad: {type: String, required: true},
        alias: {type: String, required: true, max: 400},
        avatar: {type: String, required: true}
    },
    text: {type: String, required: true, max: 400},
    timestamp: {type: String, required: true, max: 400},
})

const mensajesMongo = mongoose.model('mensajes', schema);

module.exports = mensajesMongo;