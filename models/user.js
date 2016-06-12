var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

var UserSchema = new mongoose.Schema({
  // Auto included _id: Number
  username: String,
  password: String,
  email: String,
  balance: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', UserSchema);
