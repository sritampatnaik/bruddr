var mongoose = require('mongoose');

var BruddrTaskSchema = new mongoose.Schema({
	title: String,
	type: String,
	description: String,
	owner_id: Number,
	price: Number,
	status: Number,
	received_at: { type : Date, default: Date.now},
});

module.exports = mongoose.model('BruddrTask', BruddrTaskSchema);