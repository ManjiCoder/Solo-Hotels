const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_STR;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('connectToMongo');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToMongo;
