const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//Post Model
const Post = require('../models/Post');

//Gets 10 most recent posts
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 }) //descending by date
    .limit(10)
    .then(posts => res.json(posts));
});

//Authenticate:
router.post('/', auth, (req, res) => {
  const newPost = new Post({
    name: req.body.name
  });

  newPost.save().then(post => {
    res.json(post);
  }); //adds to MongoDB
});

router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.remove();
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
