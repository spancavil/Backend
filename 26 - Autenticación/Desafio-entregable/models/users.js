var mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

const Users = mongoose.model('Users', schema);

module.exports = Users;