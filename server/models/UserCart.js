const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserCartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  order: {
    type: Array,
    default: [],
  },
  orderCount: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserCartModel = mongoose.model('cart', UserCartSchema);
module.exports = UserCartModel;
