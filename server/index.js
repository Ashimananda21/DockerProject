// server/index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_ecommerce';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
