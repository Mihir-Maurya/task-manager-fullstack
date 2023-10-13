// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  
  // Get the token from the request header
const authorizationHeader = req.header('Authorization');

if (!authorizationHeader) {
  return res.status(401).json({ message: 'No token, authorization denied' });
}

// Remove the "Bearer " prefix to get the actual token
const token = authorizationHeader.split(' ')[1];

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    
    // Add the user to the request object for further use
    req.user = decoded.user;

    // Continue with the route
    
    next();
  } catch (err) {
   
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
