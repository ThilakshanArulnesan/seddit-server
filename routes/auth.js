const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;

//User Model
const User = require('../models/User');
// @route POST /auth
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    //Create salt & hash
    const hash = bcrypt.hashSync(password, 10);

    //Compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id, name: user.name.firstName },
        jwtSecret,
        { expiresIn: 3600 * 24 },
        (err, token) => {
          if (err) throw err;

          res.json({
            user: {
              token,
              id: user.id,
              firstName: user.name.firstName,
              email: user.email
            }
          });
        }
      );
    });
  });
});

module.exports = router;
