const express = require('express');
const router = express.Router();

//User Model
const User = require('../models/Post');

//Gets 10 most recent posts
router.get('/', (req, res) => {
  res.send('register');
});

module.exports = router;
