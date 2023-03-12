/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const express = require('express');
const { body, validationResult } = require('express-validator');
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
  property_id: 1,
  property_name: 1,
  property_type: 1,
  province: 1,
  room_count: 1,
  room_facilities: 1,
  room_type: 1,
  state: 1,
};

// ROUTE: 1 Gell All Hotels Detail Using GET "rooms/all"
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
    // const rooms = await HotelModel
    //   .find({ })
    //   .select('hotel_star_rating')
    //   .sort({ hotel_star_rating: -1 });
    console.log(rooms.length);
    res.json({ rooms, nbHits: rooms.length });
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
    console.log(rooms.length);
    res.json({ rooms, nbHits: rooms.length });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 3 Gell All Cities Using GET "rooms/cities"
router.get('/cities', fetchUser, async (req, res) => {
  try {
    const rooms = await HotelModel
      .find({}, { city: 1, _id: 0 })
      .sort({ hotel_star_rating: 1 });
    // eslint-disable-next-line prefer-const
    let sets = new Set();
    rooms.map((item) => {
      sets.add(item.city);
    });
    console.log(rooms);
    res.json(Array.from(sets));
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 4 Add Hotel Admin Using POST "rooms/add"
router.post('/add', [
  body('name').exists(),
  body('address').exists(),
  body('roomType').exists(),
], fetchUser, async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array().map((obj) => obj.msg).join(' & ');
    return res.status(400).json({ msg: error });
  }
  try {
    const { name, address, roomType } = req.body;
    const newRoom = await HotelModel.create({
      name, address, roomType,
    });

    res.json({ msg: 'Room Added Successfully', newRoom });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});
module.exports = router;
