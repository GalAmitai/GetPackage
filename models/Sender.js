const mongoose = require('mongoose');

const SenderModel = new mongoose.Schema({
    companyName: { type: String, required: true }
});

module.exports = mongoose.model('Sender', SenderModel);