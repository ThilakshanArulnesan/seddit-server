const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema:
const PostSchema = new Schema({
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
  password: {
    //hashed password
    type: String,
    require: true
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
