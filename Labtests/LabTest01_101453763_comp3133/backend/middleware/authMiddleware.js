// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    // Look for an Authorization header with 'Bearer <token>'
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // e.g. "Bearer <token>"
    if (!token) {
      return res.status(403).json({ error: 'Malformed token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    // Attach user info to request object (useful in your controllers)
    req.user = decoded;
    next(); // proceed to the next middleware/controller
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
