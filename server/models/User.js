const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, require: true },
  role: { type: String, default: 'user' },
  email: { type: String, require: true },
  password: { type: String, require: true },
  // cart: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
