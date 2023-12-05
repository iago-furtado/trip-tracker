const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String}
});

userSchema.plugin(plm);
const User = mongoose.model('User', userSchema);

module.exports = User;