const pass = process.env.MONGO_PASSWORD;
module.exports = {
  mongoURI: `mongodb+srv://admin:${pass}@cluster0-uknql.mongodb.net/test?retryWrites=true&w=majority`
};
