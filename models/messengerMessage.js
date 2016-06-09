var mongoose = require('mongoose');

var MessengerMessageSchema = new mongoose.Schema({
	message: String,
	received_at: { type : Date, default: Date.now},
	sender_id: Number
});

module.exports = mongoose.model('MessengerMessage', MessengerMessageSchema);