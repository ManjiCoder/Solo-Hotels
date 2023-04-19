const mongoose = require('mongoose');

const { Schema } = mongoose;

const HotelSchema = new Schema({
  address: String,
  area: String,
  city: String,
  country: String,
  crawl_date: String,
  hotel_description: String,
  hotel_facilities: String,
  hotel_star_rating: String,
  landmark: String,
  locality: String,
  property_id: String,
  property_name: String,
  property_type: String,
  province: String,
  room_count: String,
  room_facilities: String,
  room_type: String,
  state: String,
  price: Number,
});

const HotelModel = mongoose.model('hotel', HotelSchema);
module.exports = HotelModel;
