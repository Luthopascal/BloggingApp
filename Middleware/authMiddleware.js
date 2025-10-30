// ==========================================
// Middleware: authMiddleware
// ------------------------------------------
// Purpose: Protects routes by verifying JWTs
// and ensuring that only authenticated users
// can access protected endpoints.
// ------------------------------------------
// Process:
// 1. Reads JWT from Authorization header.
// 2. Verifies it against the secret key.
// 3. Checks if token is blacklisted (logged out).
// 4. Attaches decoded user info to request.
// 5. Proceeds to route if all checks pass.
// ==========================================

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require ("../Models (Database schema)/TokenBlacklist")


const authMiddleware = async (req, res, next) => {
  try {
    // Tokens are sent via request headers — not in the body or params.
    // Example header: Authorization: Bearer <token>
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header provided.'
      });
    }

    // Split the header to isolate the token from "Bearer"
    const token = authHeader.split(' ')[1]; // [0] = Bearer, [1] = token itself
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized. Token missing.'
      });
    }

    // Check if token exists in the blacklist (meaning the user logged out)
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: 'This token has been blacklisted. Please log in again.'
      });
    }

    // Verify the token using your secret key (stored securely in production)
    const decoded = jwt.verify(token, 'LNXsecret');

    // Attach the decoded user payload (e.g., { id, email }) to the request
    req.user = decoded;

    // Continue to the protected route if everything checks out
    next();

  } catch (err) {
    // Handles invalid, expired, or tampered tokens
    return res.status(401).json({
      success: false,
      message: 'Token not valid or expired.'
    });
  }
};

// ==========================================
// Notes:
// - Headers are metadata about the request.
// - This middleware runs BEFORE the route itself.
// - Use it to protect routes like GET /profile or POST /blog.
// ==========================================

module.exports = authMiddleware;
