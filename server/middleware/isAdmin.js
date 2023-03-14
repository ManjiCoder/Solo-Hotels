/* eslint-disable consistent-return */
const UserModel = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.id) {
      // Fetching User Details & checking user role
      const user = await UserModel.findById(req.user.id);
      // console.log(user.role);
      if (user.role === 'admin') {
        req.role = user.role;
        next();
      } else {
        return res.status(400).json({ msg: 'You don\'t have permission' });
      }
    } else {
      return res.status(400).json({ msg: 'You don\'t have permission' });
    }
  } catch (error) {
    console.log(error.msg);
    return res.status(401).json({ msg: 'You dont have permission' });
  }
};

module.exports = isAdmin;
