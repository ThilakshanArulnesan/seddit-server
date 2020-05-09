const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;

//User Model
const User = require('../models/User');

//Registration route
router.post('/', (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400).json({ msg: 'Please enter all fields.' });
    return;
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name: { firstName: name.firstName, lastName: name.lastName },
      email: email,
      password: password,
    });
    //Create salt & hash
    const hash = bcrypt.hashSync(password, 10);
    newUser.password = hash;
    newUser.save().then((user) => {
      //Create JWT token:
      jwt.sign(
        { id: user.id, name: user.name.firstName },
        jwtSecret,
        { expiresIn: 3600 * 24 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              token,
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        },
      );
    });
  });
});

module.exports = router;
