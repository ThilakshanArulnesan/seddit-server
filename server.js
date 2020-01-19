const express = require('express');
const mongoose = require('mongoose'); //ORM for mongo
const bodyParser = require('body-parser'); //Gets data from request
require('dotenv').config(); // load .env data into process.env

const posts = require('./routes/posts');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json()); //Parses as json

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Use routes
app.use('/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
