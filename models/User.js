const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true},
    salt: { type: String, required: true }
});

module.exports = mongoose.model('User', UserModel);