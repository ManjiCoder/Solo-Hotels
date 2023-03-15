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
  date: {
    type: Date,
    default: Date.now,
  },
  // hotels: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'hotel',
  // },
});

const UserCartModel = mongoose.model('cart', UserCartSchema);
module.exports = UserCartModel;
