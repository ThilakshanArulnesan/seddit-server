const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema:
const PostSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
