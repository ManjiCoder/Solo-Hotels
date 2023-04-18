require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

connectToMongo(); // Database Connection Fuction

// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/hotel', require('./routes/hotel'));
app.use('/cart', require('./routes/cart'));
app.use('/order', require('./routes/order'));
app.use('/admin', require('./routes/admin'));

app.listen(port, () => {
  console.log(`Solo-Hotels - Backend app listening at http://localhost${port}`);
});
