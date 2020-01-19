const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//User Model
const User = require('../models/User');

//Gets 10 most recent posts
router.post('/', (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name: { firstName: name.firstName, lastName: name.lastName },
      email: email,
      password: password
    });
    //Create salt & hash
    const hash = bcrypt.hashSync(password, 10);
    newUser.password = hash;
    newUser.save().then(user => {
      res.json({
        user: { id: user.id, firstName: user.name.firstName, email: user.email }
      });
    });
  });
});

module.exports = router;
