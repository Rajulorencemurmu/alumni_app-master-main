const jwt = require("jsonwebtoken");

const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    "your_secret_key",
    { expiresIn: "1h" }
  );
};

module.exports = generateToken;
