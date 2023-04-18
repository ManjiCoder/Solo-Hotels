const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  hotel: {
    type: mongoose.Types.ObjectId,
    ref: 'hotel',
    require: true,
  },
  roomType: { type: String, require: true },
  room: { type: Number, require: true },
  from: { type: String, require: true },
  to: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserOrderModel = mongoose.model('order', OrderSchema);
module.exports = UserOrderModel;
