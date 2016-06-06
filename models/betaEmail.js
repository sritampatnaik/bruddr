var mongoose = require('mongoose');

var BetaEmailSchema = new mongoose.Schema({
  email: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BetaEmail', BetaEmailSchema);
