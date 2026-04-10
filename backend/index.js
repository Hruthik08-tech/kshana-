/*
 * Backend — Main Express Entry Point
 * Mounts all API route handlers and starts the HTTP server.
 * Connects to: MySQL (via src/config/db.js), auth-gateway for protected routes
 * Owner: Backend Team
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const eventsRoutes = require('./src/routes/events');
const bookingsRoutes = require('./src/routes/bookings');
const paymentsRoutes = require('./src/routes/payments');
const notificationsRoutes = require('./src/routes/notifications');

const app = express();

app.use(cors());
app.use(express.json());

// Route mounts
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/notifications', notificationsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
