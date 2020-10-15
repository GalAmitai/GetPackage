const mongoose = require('mongoose');

const DeliveryModel = new mongoose.Schema({
    packSize: { type: String, required: true },
    cost: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: Date, required: true },
    sender: { type: String },
    assign_to: { type: String }
});

module.exports = mongoose.model('Delivery', DeliveryModel);