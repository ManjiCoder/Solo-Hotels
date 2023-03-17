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
    const carts = await UserCartModel.findOne({ user }, { user: 1, order: 1 }).sort({ date: -1 });
    if (!carts) return res.status(400).json({ msg: 'Your cart is empty' });
    const loginUser = await UserModel.findById(user, { name: 1, role: 1 });
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
          updateHotel.from = obj.from;
          updateHotel.to = obj.to;
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
    // To Check Wheather hotel exists or not
    const checkHotel = await HotelModel.findById(req.params.id);
    const userId = req.user.id;
    const { from, to } = req.body;
    // If hotel not found in db
    if (!checkHotel) return res.status(401).json({ msg: 'Not Found Hotels' });

    // Checking order => USE FINDONE
    const isFirstOrder = await UserCartModel.findOne({ user: userId });

    // If Order of User is not first order, So Update the roomCount
    if (isFirstOrder) {
      // Checking UserLogin Id with json-token(auth-token) req.user.id
      if (!isFirstOrder.user.toString() === userId) return res.status(401).json({ msg: 'Not allowed' });

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
            order: {
              hotel: req.params.id, roomCount: 1, from, to,
            },
          },
        });
        res.json({ msg: newOrder.modifiedCount === 1 ? 'New order added to card successfully' : 'New order added to card unsuccessfully', newOrder });
      }
    } else {
      // If Order Of User Is First Order, So Set roomCount to 1
      const firstOrder = await UserCartModel.create({
        user: userId,
        order: [{
          hotel: req.params.id,
          roomCount: 1,
          from,
          to,
        }],
      });
      res.json({ msg: 'Item Added to Card Successfully', firstOrder });
    }
  } catch (error) {
    // If req.params.id is not valid
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "Hotel"`) {
      return res.status(400).json({ msg: 'Not allowed' });
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE 3: Update order item to cart of User using PUT "cart/update/:id" Login Require
router.put('/update/:id', fetchUser, async (req, res) => {
  try {
    // To Check User Order exist or not
    const user = req.user.id;
    const hotelId = req.params.id;
    const { roomCount, from, to } = req.body;

    // find the userCart & save changes
    const isOrder = await UserCartModel.findOne({ user });
    // console.log(isOrder);
    if (!isOrder) return res.status(400).json({ msg: 'Your cart is empty' });

    // Initiaziling order Obj to store if req.body is present
    const order = {};
    if (roomCount) order.roomCount = roomCount;
    if (from) order.from = from;
    if (to) order.to = to;

    // check req.params.id is there in db
    const isHotel = isOrder.order.filter((obj) => obj.hotel === hotelId);

    // if req.params.id not found in db
    if (isHotel.length === 0) return res.status(400).json({ msg: 'Not allowed' });

    // Filtering & Updating fields in order
    const newOrder = isOrder.order.filter((obj) => {
      if (obj.hotel === hotelId) {
        if (order.roomCount) obj.roomCount = order.roomCount;
        if (order.from) obj.from = order.from;
        if (order.to) obj.to = order.to;
      }
      return obj;
    });
    // console.log(newOrder);
    // updating the roomCount of order;
    const saveOrder = await UserCartModel.updateOne({ user }, { $set: { order: newOrder } });
    res.json({ msg: saveOrder.modifiedCount === 1 ? 'Item updated successfully' : 'Item updated unsuccessfully', Order: isOrder.order });
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
    const hotelId = req.params.id;
    const isOrder = await UserCartModel.findOne({ user });
    if (!isOrder) return res.status(400).json({ msg: 'Your cart is empty' });

    // check req.params.id is there in db
    // check req.params.id is there in db
    const isHotel = isOrder.order.filter((obj) => obj.hotel === hotelId);

    // if req.params.id not found in db
    if (isHotel.length === 0) return res.status(400).json({ msg: 'Not allowed' });
    // Filtering => Delete Hotel in order
    const newOrder = isOrder.order.filter((obj) => obj.hotel !== hotelId);

    // if req.params.id not found in db
    if (newOrder.length === 0) return res.status(400).json({ msg: 'Not allowed' });
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
    if (!isCart) return res.status(401).json({ msg: 'Your cart is empty' });
    const deleteItem = await UserCartModel.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item remove from cart successfully', deleteItem });
  } catch (error) {
    // If req.params.id is not valid
    if (error.message === `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "cart"`) {
      return res.status(400).json({ msg: 'Not allowed' });
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

module.exports = router;
