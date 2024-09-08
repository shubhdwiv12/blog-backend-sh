const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
// Middleware to verify JWT token
const auth = async (req, res, next) => {
  // Get token from the header
  console.log("dcddcdcccd", req.header('x-auth-token'))
  const token = req.header('authorization').split(" ")[1];
  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.id= decoded.userId
    next();
  } catch (err) {
      console.log("eerrr", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
