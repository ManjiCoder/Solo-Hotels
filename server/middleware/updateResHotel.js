/* eslint-disable max-len */
/* eslint-disable camelcase */

const updateResHotel = (req, res, next) => {
  const {
    address, area, city, country, crawl_date, hotel_description, hotel_facilities, hotel_star_rating, landmark, locality, property_id, property_name, property_type, province, room_count, room_facilities, room_type, state,
  } = req.body;
  const newHotel = {};
  if (address) newHotel.address = address;
  if (area) newHotel.area = area;
  if (city) newHotel.city = city;
  if (country) newHotel.country = country;
  if (crawl_date) newHotel.crawl_date = crawl_date;
  if (hotel_description) newHotel.hotel_description = hotel_description;
  if (hotel_facilities) newHotel.hotel_facilities = hotel_facilities;
  if (hotel_star_rating) newHotel.hotel_star_rating = hotel_star_rating;
  if (landmark) newHotel.landmark = landmark;
  if (locality) newHotel.locality = locality;
  if (property_id) newHotel.property_id = property_id;
  if (property_name) newHotel.property_name = property_name;
  if (property_type) newHotel.property_type = property_type;
  if (province) newHotel.province = province;
  if (room_count) newHotel.room_count = room_count;
  if (room_type) newHotel.room_type = room_type;
  if (room_facilities) newHotel.room_facilities = room_facilities;
  if (state) newHotel.state = state;
  //   const payload = newHotel;
  res.body = newHotel;
  //   console.log(payload, res.body);

  next();
};

module.exports = updateResHotel;
