const mongoose = require('mongoose');

const CourierModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true},
    vehicleType: { type: String, required: true }
});

module.exports = mongoose.model('Courier', CourierModel);