/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const UserCartModel = require('../models/UserCart');
const HotelModel = require('../models/Hotel');

const router = express.Router();

// ROUTE 1: Get Item of card of User using GET "auth/hotel/all" Login Require
router.get('/all', fetchUser, async (req, res) => {
  try {
    // find ther user & show thier own cart items
    const user = req.user.id;
    const carts = await UserCartModel.findOne({ user }, { user: 1, order: 1 }).sort({ date: -1 });
    console.log(carts);
    res.json(carts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 2: Add Order to card of User using POST "auth/hotel/add" Login Require
router.post('/add/:id', fetchUser, async (req, res) => {
  try {
    // To Check Wheather hotel exists or not
    const checkHotel = await HotelModel.findById(req.params.id);
    const userId = req.user.id;
    // console.log(checkHotel.address, userId);

    // If hotel not found in db
    if (!checkHotel) return res.status(401).json({ msg: 'Not Found Hotels' });

    // Checking order
    const isFirstOrder = await UserCartModel.findOne({});

    // If Order of User is not first order, So Update the roomCount
    if (isFirstOrder) {
      // Checking UserLogin Id with json-token(auth-token) req.user.id
      if (!isFirstOrder.user.toString() === userId) return res.status(401).json({ msg: 'Not Found Hotels' });

      //   Updating the roomCount as it's not User First Order
      const updateRoomCount = isFirstOrder.order.filter((obj) => {
        if (obj.hotel === req.params.id) return obj.roomCount += 1;
      });

      //   Updating the cart only if user req the same order with same hotel
      if (updateRoomCount.length !== 0) {
        const updateCart = await UserCartModel.updateOne({}, {
          $set: {
            order: [...isFirstOrder.order],
          },
        });
        // console.log(isFirstOrder.order);
        res.json({ msg: 'Item Updated to Card Successfully', updateRoomCount, updateCart });
      } else {
        //   if user send new hotel req
        const newOrder = await UserCartModel.updateOne({}, {
          $push: {
            order: { hotel: req.params.id, roomCount: 1 },
          },
        });
        res.json({ msg: 'New order added to card successfully', newOrder });
      }
    } else {
      // If Order Of User Is First Order, So Set roomCount to 1
      const firstOrder = await UserCartModel.create({
        user: userId,
        order: [{ hotel: req.params.id, roomCount: 1 }],
      });
      res.json({ msg: 'Item Added to Card Successfully', firstOrder });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// TODO
// ROUTE 3: Update Order to card of User using PUT "auth/hotel/add" Login Require
router.put('/update/:id', fetchUser, async (req, res) => {
  try {
    // To Check Wheather hotel exists or not
    const checkHotel = await HotelModel.findById(req.params.id);
    const userId = req.user.id;
    // console.log(checkHotel.address, userId);

    // If hotel not found in db
    if (!checkHotel) return res.json({ msg: 'Not Found Hotels' });

    // Checking order
    const isFirstOrder = await UserCartModel.findOne({});

    // If Order of User is not first order, So Update the roomCount
    if (isFirstOrder) {
      // Checking UserLogin Id with json-token(auth-token) req.user.id
      if (!isFirstOrder.user.toString() === userId) return res.json({ msg: 'Not Found Hotels' });

      //   Updating the roomCount as it's not User First Order
      const updateRoomCount = isFirstOrder.order.filter((v) => {
        if (v.hotel === req.params.id) return v.roomCount += 1;
      });
        //   Updating the cart
      const updateCart = await UserCartModel.updateOne({}, {
        $set: {
          order: [...updateRoomCount],
        },
      });
      console.log(updateCart);
      res.json({ msg: 'Item Updated to Card Successfully', updateRoomCount, updateCart });
    } else {
      // If Order Of User Is First Order, So Set roomCount to 1
      const firstOrder = await UserCartModel.create({
        user: userId,
        order: [{ hotel: req.params.id, roomCount: 1 }],
      });
      res.json({ msg: 'Item Added to Card Successfully', firstOrder });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 4: Remove Order to card of User using DELETE "auth/hotel/add" Login Require
router.delete('/remove/:id', fetchUser, async (req, res) => {
  try {
    // To Check Wheather cart exists or not
    const isCart = await UserCartModel.findById(req.params.id);
    if (!isCart) return res.status(401).json({ msg: 'Not allowed' });
    const deleteItem = await UserCartModel.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item remove from cart successfully', deleteItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

module.exports = router;
