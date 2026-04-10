/*
 * Events Route
 * Handles all event-related API endpoints (listing, search, detail view).
 * Connects to: MySQL via src/config/db.js
 * Owner: Backend Team
 */

const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * @route   GET /api/events
 * @desc    Fetch all events with organization, location, and category data
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                e.event_id AS id,
                e.title,
                e.description,
                e.rating,
                e.price,
                DATE_FORMAT(e.date, '%a, %d %b') AS date,
                TIME_FORMAT(e.start_time, '%h:%i %p') AS start_time,
                TIME_FORMAT(e.end_time, '%h:%i %p') AS end_time,
                l.address AS location_address,
                c.category_name,
                (SELECT COUNT(*) FROM seats s WHERE s.event_id = e.event_id AND s.status = 'OPEN') AS available_seats
            FROM events e
            INNER JOIN locations l ON e.location_id = l.location_id
            INNER JOIN organisations o ON e.org_id = o.org_id
            LEFT JOIN category_events ce ON e.event_id = ce.event_id
            LEFT JOIN categories c ON ce.category_id = c.category_id
            ORDER BY e.rating DESC, e.date ASC;
        `;

        const [events] = await db.query(query);
        
        // Return 200 OK with the list of events
        return res.status(200).json(events);
    } catch (error) {
        console.error('[EVENTS_ROUTE_ERROR]:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve events. Please try again later.' 
        });
    }
});

/**
 * @route   GET /api/events/categories
 * @desc    Fetch all available event categories with active event counts
 * @access  Public
 */
router.get('/categories', async (req, res) => {
    try {
        const query = `
            SELECT 
                c.category_id, 
                c.category_name,
                COUNT(ce.event_id) AS event_count
            FROM categories c
            LEFT JOIN category_events ce ON c.category_id = ce.category_id
            GROUP BY c.category_id
            ORDER BY event_count DESC, c.category_name ASC;
        `;
        const [categories] = await db.query(query);
        return res.status(200).json(categories);
    } catch (error) {
        console.error('[CATEGORIES_ROUTE_ERROR]:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve categories.' 
        });
    }
});


/**
 * @route   GET /api/events/:id
 * @desc    Fetch single event details by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                e.*, 
                l.address, l.lat, l.lon,
                o.title as org_title, o.rating as org_rating
            FROM events e
            JOIN locations l ON e.location_id = l.location_id
            JOIN organisations o ON e.org_id = o.org_id
            WHERE e.event_id = ?;
        `;
        const [rows] = await db.query(query, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('[EVENT_DETAIL_ERROR]:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

