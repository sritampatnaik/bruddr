var mongoose = require('mongoose');

var BruddrTaskSchema = new mongoose.Schema({
	title: String,
	type: String,
	description: String,
	owner_id: Number,
	bruddr_name: String,
	price: Number,
	status: Number, // 0: Pending, 1: Bruddr matched, 2: Bruddr Completed, 3: Withdrawn
	received_at: { type : Date, default: Date.now},
});

module.exports = mongoose.model('BruddrTask', BruddrTaskSchema);
