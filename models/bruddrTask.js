var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var BruddrTaskSchema = new mongoose.Schema({
	// Auto included _id: Number
	title: String,
	type: String,
	description: String,
	owner_id: Number,
	bruddr_id: { type : Number, default: -1},
	price: Number,
	status: Number, // 0: Pending, 1: Bruddr matched, 2: Bruddr Completed, 3: Withdrawn
	received_at: { type : Date, default: Date.now},
});

BruddrTaskSchema.plugin(autoIncrement.plugin, 'BruddrTask');
module.exports = mongoose.model('BruddrTask', BruddrTaskSchema);
