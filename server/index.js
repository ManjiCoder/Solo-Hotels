require('dotenv').config();

const express = require('express');
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

connectToMongo(); // Database Connection Fuction

// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/rooms', require('./routes/rooms'));

app.listen(port, () => {
  console.log(`Solo-Hotels - Backend app listening at http://localhost${port}`);
});
