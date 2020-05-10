const Post = require('../Post');

//Connect to mongo

const updateUserId = async () => {
  const posts = await Post.updateMany(
    { title: 'this is the title??' },
    { title: 'this is the title' },
  );

  console.log('\x1b[32m%s\x1b[0m', `Updated ${posts.nModified} posts.`);
  console.log(JSON.stringify(posts, undefined, 2));
  //   console.log(JSON.stringify(posts2, undefined, 2));
};

module.exports = updateUserId;
