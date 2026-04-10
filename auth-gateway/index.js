/*
 * Auth Gateway — Entry Point
 * Standalone Express server that mounts JWT authentication middleware.
 * All downstream services proxy through this gateway for token validation.
 * Owner: Auth Team
 */

const express = require('express');
require('dotenv').config();

const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

// Health check
app.get('/ping', (req, res) => res.json({ status: 'auth-gateway live' }));

// Mount auth middleware on all protected routes
app.use('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Auth gateway running on port ${PORT}`);
});
