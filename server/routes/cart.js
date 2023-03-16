/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const UserCartModel = require('../models/UserCart');
const HotelModel = require('../models/Hotel');
const UserModel = require('../models/User');

const router = express.Router();

// ROUTE 1: Get Item of card of User using GET "cart/all" Login Require
router.get('/all', fetchUser, async (req, res) => {
  try {
    // find ther user & show thier own cart items
    const user = req.user.id;
    const loginUser = await UserModel.findById(user, { name: 1, role: 1 });
    const carts = await UserCartModel.findOne({ user }, { user: 1, order: 1 }).sort({ date: -1 });
    // console.log(carts);

    // Fetching Hotels Details
    const hotels = carts.order.map((obj) => HotelModel.findById(obj.hotel, {
      property_name: 1, property_type: 1, state: 1,
    }));

    // Logic For replacing userId with UserModel & hotelId with HotelModel
    Promise.all(hotels)
      .then((value) => value)
      .then((hotelDetails) => {
        const order = [];
        carts.order.forEach((obj, i) => {
          const updateHotel = {};
          updateHotel.hotel = hotelDetails[i];
          updateHotel.roomCount = obj.roomCount;
          order.push(updateHotel);
        });
        carts.order = order;
        carts.user = loginUser;
        res.json(carts);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 2: Add Order to card of User using POST "cart/add" Login Require
router.post('/add/:id', fetchUser, async (req, res) => {
  try {
    // const { from, to } = req.body;
    // To Check Wheather hotel exists or not
    const checkHotel = await HotelModel.findById(req.params.id);
    const userId = req.user.id;

    // If hotel not found in db
    if (!checkHotel) return res.status(401).json({ msg: 'Not Found Hotels' });

    // Checking order => USE FINDONE
    const isFirstOrder = await UserCartModel.findOne({ user: userId });

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
        const updateCart = await UserCartModel.updateOne({ user: userId }, {
          $set: {
            order: [...isFirstOrder.order], // IMP
          },
        });
        // console.log(isFirstOrder.order);
        res.json({ msg: 'Item updated to card successfully', updateRoomCount, updateCart });
      } else {
        //   if user send new hotel req
        const newOrder = await UserCartModel.updateOne({ user: userId }, {
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
        order: [{
          hotel: req.params.id, roomCount: 1,
        }],
      });
      res.json({ msg: 'Item Added to Card Successfully', firstOrder });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 3: Update RoomCount to cart of User using PUT "cart/update-room-count/:id" Login Require
router.put('/update-room-count/:id', fetchUser, async (req, res) => {
  try {
    // To Check User Order exist or not
    const user = req.user.id;
    const { roomCount, hotel } = req.body;
    const isOrder = await UserCartModel.findOne({ user });
    if (!isOrder) return res.status(400).json({ msg: 'Your cart is empty' });

    // Filtering => Update RoomCount in order
    const newOrder = isOrder.order.filter((obj) => {
      if (obj.hotel === hotel) {
        obj.roomCount = roomCount;
      }
      return obj;
    });
    // updating the roomCount of order;
    // const updateOrder = await UserCartModel.findByIdAndUpdate(req.params.id, { $set: { order: newOrder } });
    const updateOrder = await UserCartModel.updateOne({ user }, { $set: { order: newOrder } });

    res.json({ msg: updateOrder.modifiedCount === 1 ? 'Item updated successfully' : 'Item updated unsuccessfully', Order: isOrder.order });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 4: Remove item of order from cart of User using PUT "cart/remove-order/:id" Login Require
router.put('/remove-order/:id', fetchUser, async (req, res) => {
  try {
    // To Check User Order exist or not
    const user = req.user.id;
    const { hotel } = req.body;
    const isOrder = await UserCartModel.findOne({ user });
    if (!isOrder) return res.status(400).json({ msg: 'Your cart is empty' });

    // Filtering => Delete Hotel in order
    const newOrder = isOrder.order.filter((obj) => obj.hotel !== hotel);
    // const updateOrder = await UserCartModel.findByIdAndUpdate(req.params.id, { $set: { order: newOrder } });
    const updateOrder = await UserCartModel.updateOne({ user }, { $set: { order: newOrder } });
    const restOrder = await UserCartModel.findOne({ user });
    res.json({ msg: updateOrder.modifiedCount === 1 ? 'Item remove successfully' : 'Item remove unsuccessfully', Order: restOrder.order });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 5: Remove Item from the cart of User using DELETE "cart/remove/:id" Login Require
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
