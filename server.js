const express = require('express');
const mongoose = require('mongoose'); //ORM for mongo
require('dotenv').config(); // load .env data into process.env

const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// Bodyparser Middleware
app.use(express.json()); //Parses as json

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

//Use routes
app.use('/posts', posts);
app.use('/users', users);
app.use('/auth', auth);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
