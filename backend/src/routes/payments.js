/*
 * Payments Route
 * Handles payment initiation, verification, and refund operations.
 * Connects to: MySQL via src/config/db.js, external payment gateway
 * Owner: Backend Team
 */

const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => res.json({ status: 'payments route live' }));

// TODO: POST /initiate — start a payment session for a booking
// TODO: POST /verify — verify payment callback from gateway
// TODO: POST /refund/:bookingId — process refund for a cancelled booking

module.exports = router;
