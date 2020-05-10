const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
