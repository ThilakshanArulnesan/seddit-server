const jwtSecret = require("../config/keys").jwtSecret;
const jwt = require("jsonwebtoken");

// Checks if the token is valid:
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log("token");
  //Check for token
  if (!token) {
    res.status(401).json({ msg: "No token, authorization failed." }); //unauthorized
    return;
  }

  try {
    // Verify token:
    const decoded = jwt.verify(token, jwtSecret); //Will throw an error if invalid
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
