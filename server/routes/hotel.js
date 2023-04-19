/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const HotelModel = require('../models/Hotel');

const router = express.Router();
// For MongoDB filterQuery
const filterQuery = {
  address: 1,
  area: 1,
  city: 1,
  country: 1,
  crawl_date: 1,
  hotel_description: 1,
  hotel_facilities: 1,
  hotel_star_rating: 1,
  landmark: 1,
  locality: 1,
  latitude: 1,
  longitude: 1,
  qts: 1,
  property_id: 1,
  property_name: 1,
  property_type: 1,
  province: 1,
  room_count: 1,
  room_facilities: 1,
  room_type: 1,
  state: 1,
  price: 1,
};

// ROUTE: 1 Gell All Hotels Detail Using GET "hotels/all"
router.get('/all', fetchUser, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const skip = (page - 1) * limit;
    const rooms = await HotelModel
      .find({}, filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ hotel_star_rating: -1 });
    // console.log(rooms.length);
    // res.json({ rooms, nbHits: rooms.length });
    res.json(rooms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 2 Gell All Hotels Detail Using Query "rooms?city"
router.get('/', fetchUser, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const skip = (page - 1) * limit;
    const rooms = await HotelModel
      .find({ city: req.query.city }, filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ hotel_star_rating: -1 });
    //   .countDocuments(); // TODO
    // console.log(rooms.length);
    res.json({ rooms, nbHits: rooms.length });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 3 Gell All Cities Using GET "hotels/cities"
router.get('/cities', fetchUser, async (req, res) => {
  try {
    const rooms = await HotelModel
      .find({}, {
        city: 1, _id: 0, state: 1, country: 1,
      })
      .sort({ city: 1 });
    const allCities = new Set();
    const filterCities = [];
    rooms.map((obj) => {
      const { city } = obj;
      if (!allCities.has(city)) {
        allCities.add(city);
        filterCities.push(obj);
      }
    });
    res.json(filterCities);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

module.exports = router;
