const express = require('express');
require('../db/mongoose');
// require('./seed');

const User = require('../models/user');
const Visits = require('../models/visit');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.listen(port, () => {
  console.log(`App is up and running on ${port}`);
});