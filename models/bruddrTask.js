var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var BruddrTaskSchema = new mongoose.Schema({
	// Auto included _id: Number
	title: String,
	type: String,
	description: String,
	owner_id: Number,
	owner_avatar: { type : String, default: 'https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/13407224_10207825899787160_5503872933321541187_n.jpg?oh=0011f50f94eb433b97ce2018f5009d67&oe=57D2B913'}, 
	owner_name: String,
	bruddr_id: { type : Number, default: -1},
	price: Number,
	status: Number, // 0: Pending, 1: Bruddr matched, 2: Bruddr Completed, 3: Withdrawn
	received_at: { type : Date, default: Date.now},
});

BruddrTaskSchema.plugin(autoIncrement.plugin, 'BruddrTask');
module.exports = mongoose.model('BruddrTask', BruddrTaskSchema);
