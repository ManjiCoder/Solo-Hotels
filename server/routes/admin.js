/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable camelcase */
require('dotenv').config();
/* eslint-disable consistent-return */

// console.log(process.env.PORT);
const express = require('express');
// const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const updateResHotel = require('../middleware/updateResHotel');
const HotelModel = require('../models/Hotel');
const UserModel = require('../models/User');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// END-POINT FOR USERS
// ROUTE: 1 Get all User from db using GET => "/admin/users"
router.get('/users', fetchUser, isAdmin, async (req, res) => {
  try {
    const users = await UserModel.find({}, {
      name: 1, role: 1, email: 1, date: 1,
    });
    // console.log(users);
    res.json(users);
    // return res.status(401).json({ msg: 'You don\'t have permission' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 2 Update User using from db using PUT => "/admin/users/update/:id"
router.put('/users/update/:id', fetchUser, isAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const checkUser = await UserModel.find({ _id: req.params.id }).select('-password');
    // console.log(checkUser);
    if (!checkUser) return res.status(400).json({ msg: 'User Not Found' });
    const newUser = {};
    // We can update anyfield but UPDATE ONLY role
    if (name) newUser.name = name;
    if (email) newUser.email = email;
    if (role) newUser.role = role;
    const updateUser = await UserModel.updateOne({ _id: req.params.id }, { $set: newUser }, { new: true });
    res.json({ msg: updateUser.modifiedCount !== 0 ? 'User Updated Successfully' : 'User Update Unsuccessful', user: checkUser });
  } catch (error) {
    if (
      error.message === 'Cast to ObjectId failed for value "{ _id: undefined }" (type Object) at path "_id" for model "user"'
    ) {
      return res.status(404).send('User Not Found');
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 3 Delete User using from db using DELETE => "/admin/users/delete/:id"
router.delete('/users/delete/:id', fetchUser, isAdmin, async (req, res) => {
  try {
    const checkUser = await UserModel.find({ _id: req.params.id }).select('-password');
    console.log(checkUser);
    if (!checkUser || checkUser.length === 0) return res.status(400).json({ msg: 'User Not Found' });

    const deleteUser = await UserModel.deleteOne({ _id: req.params.id });
    res.json({ msg: deleteUser.modifiedCount !== 0 ? 'User Updated Successfully' : 'User Updated Successfully', user: checkUser });
  } catch (error) {
    if (
      error.message === `Cast to ObjectId failed for value "${req.params.id}" (type string) at path "_id" for model "user"`
    ) {
      return res.status(404).send('User Not Found');
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// END-POINT FOR HOTELS
// ROUTE: 4 Get all search Hotels from db using GET => "/admin/users/search"
router.get('/hotels/search', fetchUser, isAdmin, async (req, res) => {
  try {
    const data = await HotelModel.find(req.body);
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 5 Get all Hotels from db using GET => "/admin/hotels"
router.get('/hotels', fetchUser, isAdmin, async (req, res) => {
  try {
    const data = await HotelModel
      .find({}, { property_name: 1, state: 1 })
      .sort({ property_name: 1 });
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 6 Add Hotel by Admin Using POST => "admin/hotels/add"
router.post('/hotels/add', fetchUser, isAdmin, async (req, res) => {
  try {
    const {
      address,
      area,
      city,
      country,
      crawl_date,
      hotel_description,
      hotel_facilities,
      hotel_star_rating,
      landmark,
      locality,
      property_id,
      property_name,
      property_type,
      province,
      room_count,
      room_facilities,
      room_type,
      state,
    } = req.body;
    const checkRoom = await HotelModel.find({ property_name });
    // console.log(checkRoom);
    if (checkRoom.length !== 0) return res.status(400).json({ msg: 'Room already exists', checkRoom });
    const newRoom = await HotelModel.create(
      {
        address,
        area,
        city,
        country,
        crawl_date,
        hotel_description,
        hotel_facilities,
        hotel_star_rating,
        landmark,
        locality,
        property_id,
        property_name,
        property_type,
        province,
        room_count,
        room_facilities,
        room_type,
        state,
      },
    );
    res.json({ msg: 'Room Added Successfully', newRoom });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 7 Update Hotel by Admin Using PUT => "admin/hotels/add"
router.put('/hotels/update/:id', fetchUser, isAdmin, updateResHotel, async (req, res) => {
  try {
    const checkRoom = await HotelModel.find({ _id: req.params.id });
    // console.log(checkRoom);
    if (!checkRoom) return res.status(400).json({ msg: 'Room Not exists' });

    // hotelCreateUpdateMid => middleware is checking req.body
    const updateRoom = await HotelModel.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true });
    console.log(updateRoom.acknowledged);
    res.json({ msg: 'Room Updated Successfully', updateRoom });
  } catch (error) {
    if (
      error.message === `Cast to ObjectId failed for value "{ _id: '${req.params.id}' }" (type Object) at path "_id" for model "Hotel"`
    ) {
      return res.status(404).send('Not Found');
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

// ROUTE: 8 Delete Hotel by Admin Using DELETE => "admin/hotels/remove/:id"
router.delete('/hotels/remove/:id', fetchUser, isAdmin, async (req, res) => {
  try {
    const checkRoom = await HotelModel.findByIdAndDelete({ _id: req.params.id });
    if (!checkRoom) return res.status(400).json({ msg: 'Room doesn\'t exists' });
    res.json({ msg: 'Room Deleted Successfully', checkRoom });
  } catch (error) {
    if (
      error.message === `Cast to ObjectId failed for value "{ _id: '${req.params.id}' }" (type Object) at path "_id" for model "Hotel"`
    ) {
      return res.status(404).send('Not Found');
    }
    console.log(error.message);
    res.status(500).send('Some Error Occured');
  }
});

module.exports = router;
