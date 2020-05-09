const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Post Model
const Post = require("../models/Post");
const User = require("../models/User");

//Gets 10 most recent posts
// router.get("/", (req, res) => {
//   Post.find()
//     .sort({ date: -1 }) //descending by date
//     .limit(10)
//     .then(posts => res.json(posts));
// });

//Authenticate:
router.post("/", auth, (req, res) => {
  const { user } = req;
  const { title, body } = req.body;
  const foundUser = User.findById(user.id);
  if (!foundUser) {
    res.statusCode(401).send();
    return;
  }
  const newPost = new Post({
    title,
    body,
    user: user.id
  });

  newPost.save().then(post => {
    res.json(post);
  }); //adds to MongoDB
});

router.get("/", auth, async (req, res) => {
  const posts = await Post.find().populate("user");

  console.log(posts);
  res.json(posts);
});

router.delete("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.remove();
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
