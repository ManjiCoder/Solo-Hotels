/* eslint-disable consistent-return */

// console.log(process.env.PORT);
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/User');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

// ROUTE 1: Creating User using POST "/auth/signup" No Login Require
router.post(
  '/signup',
  [
    body('name', 'Name should be atleast 5 characters').isLength({ min: 2 }),
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password should be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map((obj) => obj.msg).join(' & ');
      return res.status(400).json({ msg: error });
    }

    try {
      const {
        name, email, password, role,
      } = req.body;
      // Hashing Password Using bycrypt
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);
      // console.log(securedPassword);

      // To Check Wheather User exists in db
      const checkUser = await UserModel.findOne({ email });
      if (checkUser) return res.status(400).json({ msg: 'Sorry this email is already taken' });
      // Saving User Info in db
      const newUser = await UserModel.create({
        name, email, password: securedPassword, role,
      });

      // Creating auth-token
      const payload = {
        user: {
          // eslint-disable-next-line no-underscore-dangle
          id: newUser._id,
        },
      };
      const authToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      // console.log(authToken);
      const user = await UserModel.find({ email }, {
        name: 1, email: 1, role: 1, date: 1,
      });
      res.json({ msg: 'Account Created Successfully', user: [...user], authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Some Error Occured');
    }
  },
);

// ROUTE 2: Authenticating User Login using POST "/auth/login" Login Require
router.post(
  '/login',
  [
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password should be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map((obj) => obj.msg).join(' & ');
      return res.status(400).json({ msg: error });
    }

    try {
      const { email, password } = req.body;
      // To Check Wheather User exists in db
      const checkUser = await UserModel.findOne({ email }); // return null or obj
      if (!checkUser) {
        return res.status(400).json({ msg: 'Please try to login with correct credentials' });
      }

      // IMP bcrypt.compare(password, req.body.password)
      const comparePassword = await bcrypt.compare(password, checkUser.password); // return boolean
      // console.log(comparePassword);
      if (!comparePassword) {
        return res.status(400).json({ msg: 'Please try to login with correct credentials' });
      }

      // Creating auth-token
      const payload = {
        user: {
          // eslint-disable-next-line no-underscore-dangle
          id: checkUser._id,
        },
      };
      const authToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      // console.log(authToken);
      const user = await UserModel.find({ email }, {
        name: 1, email: 1, role: 1, date: 1,
      });
      res.json({ msg: 'Login Successfully', user: [...user], authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Some Error Occured');
    }
  },
);

// ROUTE 3: Get Data of User Login using POST "/auth/user" Login Require
router.post(
  '/user',
  fetchUser,
  async (req, res) => {
    try {
      const userId = req.user.id; // verify json web token & getting user id in req
      // console.log(userId);
      const user = await UserModel.find({ _id: userId }).select('-password'); // select is used to ignore
      res.json({ user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Some Error Occured');
    }
  },
);

module.exports = router;
