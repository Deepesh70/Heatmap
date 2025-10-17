const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('Authorization')?.split(' ')[1]; // Format: "Bearer TOKEN"

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use a strong secret in a real app
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};