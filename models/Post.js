const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
// Create Schema:
const PostSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
