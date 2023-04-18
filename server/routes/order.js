/* eslint-disable consistent-return */
const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const HotelModel = require('../models/Hotel');
const UserOrderModel = require('../models/UserOrder');

const router = express.Router();

// ROUTE 1: Book hotels using GET "order/add/:id" Login Require
router.post('/add/:id', fetchUser, [
  body('room', 'room required').exists(),
  body('from', 'check-in required').exists(),
  body('to', 'check-out required').exists(),
], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array().map((obj) => obj.msg).join(' & ');
    return res.status(400).json({ msg: error });
  }

  try {
    const { from, to, room } = req.body;

    // To Check Wheather hotel exists or not
    const checkHotel = await HotelModel.findById(req.params.id);
    // If hotel not found in db
    if (!checkHotel) return res.status(401).json({ msg: 'Not Found Hotels' });

    const order = await UserOrderModel.create({
      hotel: req.params.id,
      from,
      to,
      room,
    });
    res.json({ order });
  } catch (error) {
    // If req.params.id is not valid
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "hotel"`) {
      return res.status(400).json({ msg: 'Not allowed' });
    }
    console.log(error.message);
  }
});

module.exports = router;
