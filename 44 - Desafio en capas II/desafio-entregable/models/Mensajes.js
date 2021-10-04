var mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true}
});

const MensajesMongo = mongoose.model('MensajesDesafios', schema);

module.exports = MensajesMongo;