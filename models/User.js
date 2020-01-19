const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema:
const UserSchema = new Schema({
  name: {
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    }
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    //hashed password
    type: String,
    require: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('user', UserSchema);
