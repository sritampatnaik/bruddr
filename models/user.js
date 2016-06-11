var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  balance: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
