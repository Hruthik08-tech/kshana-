-- ============================================================
-- seed.sql — Dummy Data (Bangalore, near 12.8725, 77.5751)
-- All inserts use INSERT IGNORE — safe to re-run
-- ============================================================

-- ── Categories ──────────────────────────────────────────────
INSERT IGNORE INTO categories (category_id, category_name, category_weight) VALUES
(1, 'Music',     1.5),
(2, 'Education', 1.3),
(3, 'Tech',      1.4),
(4, 'Sports',    1.2),
(5, 'Spiritual', 1.1),
(6, 'Cooking',   1.0),
(7, 'Business',  1.3);

-- ── Users ───────────────────────────────────────────────────
-- Passwords are bcrypt hashes of 'Password@123'
INSERT IGNORE INTO users (user_id, name, email, password, created_at) VALUES
(1,  'Arjun Sharma',    'arjun.sharma@gmail.com',    '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(2,  'Priya Nair',      'priya.nair@gmail.com',      '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(3,  'Rahul Verma',     'rahul.verma@gmail.com',     '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(4,  'Sneha Reddy',     'sneha.reddy@gmail.com',     '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(5,  'Vikram Iyer',     'vikram.iyer@gmail.com',     '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(6,  'Ananya Menon',    'ananya.menon@gmail.com',    '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(7,  'Karthik Rao',     'karthik.rao@gmail.com',     '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(8,  'Divya Pillai',    'divya.pillai@gmail.com',    '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(9,  'Suresh Kumar',    'suresh.kumar@gmail.com',    '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW()),
(10, 'Meera Krishnan',  'meera.krishnan@gmail.com',  '$2b$10$KIXx9z1q1oN5v2u3r4t5uOe8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t', NOW());

-- ── User Preferences (near user location 12.8725, 77.5751) ──
INSERT IGNORE INTO user_preferences (preference_id, user_id, max_distance, address, lat, lon) VALUES
(1,  1,  3.0, 'Uttarahalli Main Road, Bangalore - 560061', 12.8725, 77.5751),
(2,  2,  2.0, 'Kanakapura Road, Bangalore - 560062',       12.8800, 77.5820),
(3,  3,  5.0, 'Banashankari 3rd Stage, Bangalore - 560085',12.9100, 77.5500),
(4,  4,  2.0, 'JP Nagar 7th Phase, Bangalore - 560078',    12.8900, 77.5780),
(5,  5,  4.0, 'Dollars Colony, JP Nagar, Bangalore',        12.9050, 77.5900),
(6,  6,  2.0, 'Puttenahalli, Bangalore - 560062',           12.8750, 77.5680),
(7,  7,  3.0, 'Sarakki, JP Nagar, Bangalore - 560078',     12.9200, 77.5750),
(8,  8,  2.0, 'Kumaraswamy Layout, Bangalore - 560078',    12.8950, 77.5600),
(9,  9,  5.0, 'Girinagar, Bangalore - 560085',              12.9300, 77.5450),
(10, 10, 2.0, 'BTM Layout 2nd Stage, Bangalore - 560076',  12.9170, 77.6100);

-- ── User Preferred Categories ────────────────────────────────
INSERT IGNORE INTO user_preferred_categories (user_id, category_id) VALUES
(1, 3),(1, 7),
(2, 1),(2, 6),
(3, 3),(3, 2),
(4, 4),(4, 1),
(5, 7),(5, 3),
(6, 5),(6, 6),
(7, 2),(7, 3),
(8, 1),(8, 5),
(9, 4),(9, 2),
(10,6),(10,7);

-- ── Locations (all within ~3km of 12.8725, 77.5751) ─────────
INSERT IGNORE INTO locations (location_id, address, lat, lon) VALUES
(1,  'JP Nagar Community Hall, 6th Phase, JP Nagar, Bangalore - 560078',      12.8950, 77.5830),
(2,  'Kumara Park Ground, Kanakapura Road, Bangalore - 560062',               12.8820, 77.5740),
(3,  'Banashankari BDA Complex Auditorium, Banashankari, Bangalore - 560070', 12.9250, 77.5540),
(4,  'IIMB - IIM Bangalore Campus, Bannerghatta Road, Bangalore - 560076',   12.9355, 77.6121),
(5,  'Christ University Auditorium, Hosur Road, Bangalore - 560029',          12.9165, 77.6103),
(6,  'Ravindra Kalakshetra, Gandhi Nagar, Bangalore - 560009',                12.9716, 77.5919),
(7,  'MLR Convention Centre, JP Nagar, Bangalore - 560078',                   12.9070, 77.5720),
(8,  'Gokulam Convention Hall, Vijayanagar, Bangalore - 560040',              12.9760, 77.5350),
(9,  'Jain College Ground, V.V. Puram, Bangalore - 560004',                   12.9490, 77.5685),
(10, 'Kumaraswamy Layout Park, Bangalore - 560078',                            12.8930, 77.5610),
(11, 'Puttenahalli Lake View Community Hall, JP Nagar, Bangalore - 560062',   12.8780, 77.5670),
(12, 'Padmanabhanagar Club, Padmanabhanagar, Bangalore - 560070',             12.9080, 77.5580),
(13, 'Uttarahalli Civic Amenity Centre, Uttarahalli, Bangalore - 560061',     12.8700, 77.5780),
(14, 'Kanakapura Road BBMP Grounds, Bangalore - 560062',                      12.8650, 77.5800),
(15, 'Sir M Visvesvaraya IT Park Auditorium, Whitefield, Bangalore',          12.9698, 77.7499);

-- ── Organisations ────────────────────────────────────────────
INSERT IGNORE INTO organisations (org_id, location_id, title, rating) VALUES
(1,  7,  'Namma Bangalore Tech Collective',       4.5),
(2,  4,  'IIMB Entrepreneurship Cell',            4.7),
(3,  5,  'Christ University Cultural Committee',  4.3),
(4,  6,  'Bangalore Music & Arts Foundation',     4.6),
(5,  3,  'Banashankari Spiritual Trust',          4.4),
(6,  12, 'South Bangalore Sports Academy',        4.2),
(7,  7,  'Startup Garage Bangalore',              4.5),
(8,  11, 'Namma Ruchi Cooking School',            4.1),
(9,  1,  'JP Nagar Residents Welfare Association',4.0),
(10, 9,  'Samskruthi Education Foundation',       4.3);

-- ── Events (realistic dates ~30 days from now) ───────────────
INSERT IGNORE INTO events (event_id, org_id, location_id, title, description, rating, price, date, start_time, end_time) VALUES
(1,  1,  7,  'Bangalore DevFest 2025',
 'Banaglore''s biggest community-run Google Developer Festival. Sessions on AI/ML, Flutter, Firebase, Cloud and more. Free swag for all attendees!',
 4.5, 199.00, '2025-05-10', '2025-05-10 09:00:00', '2025-05-10 18:00:00'),

(2,  1,  7,  'Open Source Hackathon — Build for Bharat',
 'A 24-hour hackathon challenging teams to build open source solutions for Indian problems. Prizes worth ₹2,00,000. Food and stays included.',
 4.6, 0.00,   '2025-05-17', '2025-05-17 08:00:00', '2025-05-18 08:00:00'),

(3,  2,  4,  'IIMB Startup Conclave 2025',
 'Connect with top VCs, angel investors and serial entrepreneurs. Panel discussions, fireside chats and a pitch competition with ₹5 lakh prize pool.',
 4.8, 499.00, '2025-05-12', '2025-05-12 10:00:00', '2025-05-12 17:00:00'),

(4,  2,  4,  'Financial Freedom Workshop — Mutual Funds & SIP',
 'Learn the basics of SIPs, index funds and tax-saving ELSS funds from SEBI-registered advisors. Practical, jargon-free and beginner-friendly.',
 4.4, 299.00, '2025-05-18', '2025-05-18 10:00:00', '2025-05-18 13:00:00'),

(5,  3,  5,  'Carnatic Music Summer Festival',
 'A three-day Carnatic classical music festival featuring top artists from across Karnataka. Ragas, rhythms and soul — a true celebration of tradition.',
 4.7, 150.00, '2025-05-20', '2025-05-20 17:00:00', '2025-05-20 21:00:00'),

(6,  4,  6,  'Sufi & Folk Night — Ek Shaam Bangalore Ke Naam',
 'An evening of soulful Sufi music by Ustad Farid Khan and folk performances by artists from Rajasthan. Light dinner included.',
 4.6, 350.00, '2025-05-15', '2025-05-15 18:30:00', '2025-05-15 22:00:00'),

(7,  4,  6,  'Bangalore Choir Fest 2025',
 'Fifteen choirs from Bangalore and Mysore compete in this annual choral competition. Western classical, Bollywood medleys and original compositions.',
 4.3, 100.00, '2025-05-24', '2025-05-24 15:00:00', '2025-05-24 20:00:00'),

(8,  5,  3,  'Vedanta Philosophy Retreat — 1-Day Workshop',
 'A full-day immersive session on Advaita Vedanta led by Swami Vivekananda Puri. Includes meditation, satsang and prasad lunch.',
 4.5, 0.00,   '2025-05-11', '2025-05-11 07:00:00', '2025-05-11 17:00:00'),

(9,  5,  3,  'Yoga & Pranayama Camp — Summer Special',
 'A 3-day yoga camp covering Hatha Yoga, Pranayama and Yoga Nidra. Certified instructor with 20 years of experience. Mats provided.',
 4.4, 500.00, '2025-05-22', '2025-05-22 06:00:00', '2025-05-22 08:30:00'),

(10, 6,  12, 'Inter-Colony Cricket Tournament',
 'South Bangalore''s biggest inter-colony cricket tournament. T20 format, 16 teams, knockout rounds over 2 days. Free entry for spectators.',
 4.2, 0.00,   '2025-05-25', '2025-05-25 07:00:00', '2025-05-25 19:00:00'),

(11, 6,  9,  'Badminton Open — South Zone Qualifier',
 'State-level badminton qualifier for Under-19 and Open categories. BAI certified event. Prize money: ₹50,000 total purse.',
 4.3, 200.00, '2025-05-19', '2025-05-19 08:00:00', '2025-05-19 18:00:00'),

(12, 7,  7,  'Product Management Masterclass',
 'A full-day PM masterclass by product leaders from Flipkart, Meesho and Razorpay. Covers roadmapping, prioritisation, user research and metrics.',
 4.6, 999.00, '2025-05-16', '2025-05-16 09:00:00', '2025-05-16 18:00:00'),

(13, 7,  7,  'B2B SaaS Sales Bootcamp',
 'Learn outbound sales, cold email and demo techniques tailored for Indian B2B SaaS companies. Taught by founders who have sold to Fortune 500 clients.',
 4.4, 799.00, '2025-05-23', '2025-05-23 09:00:00', '2025-05-23 17:00:00'),

(14, 8,  11, 'Ragi & Millet Cooking Workshop',
 'Learn traditional Karnataka recipes using ragi, jowar and bajra. Expert chef Smt. Sulochana Gowda guides you through 8 healthy, tasty dishes.',
 4.2, 450.00, '2025-05-13', '2025-05-13 10:00:00', '2025-05-13 14:00:00'),

(15, 8,  11, 'Home Baking Masterclass — Indian Sweets Edition',
 'Master gulab jamun, rasmalai and besan ladoo using easy home-baking methods. All ingredients provided. Take-home goodies included!',
 4.3, 600.00, '2025-05-21', '2025-05-21 11:00:00', '2025-05-21 15:00:00'),

(16, 9,  1,  'JP Nagar Education Fair 2025',
 'A curated education fair for students from Class 8 to PUC. Stalls from 30+ colleges, coaching institutes and scholarship bodies. Fully free.',
 4.1, 0.00,   '2025-05-14', '2025-05-14 10:00:00', '2025-05-14 17:00:00'),

(17, 10, 9,  'NEET & JEE Strategy Session — Free Seminar',
 'Expert faculty from Allen and Aakash share exam strategy, time management tips and subject-wise plans for 2026 aspirants. Free entry.',
 4.5, 0.00,   '2025-05-18', '2025-05-18 14:00:00', '2025-05-18 17:00:00'),

(18, 1,  13, 'AI/ML Study Circle — Fortnightly Meetup',
 'Casual fortnightly meetup for ML practitioners and enthusiasts. Paper discussions, project showcases and networking. All levels welcome.',
 4.4, 0.00,   '2025-05-17', '2025-05-17 10:00:00', '2025-05-17 13:00:00'),

(19, 6,  10, 'Zumba & Dance Fitness Carnival',
 'A high-energy outdoor Zumba and fitness carnival with 5 certified trainers. Bollywood, Latin and bhangra beats. Open to all ages.',
 4.2, 100.00, '2025-05-25', '2025-05-25 07:00:00', '2025-05-25 09:30:00'),

(20, 5,  2,  'Isha Meditation Evening — Shambhavi Mahamudra Introduction',
 'A free introductory session on Shambhavi Mahamudra meditation practice by Isha Foundation volunteers. No prior experience required.',
 4.6, 0.00,   '2025-05-11', '2025-05-11 18:00:00', '2025-05-11 20:30:00');

-- ── Category ↔ Event Mapping ─────────────────────────────────
INSERT IGNORE INTO category_events (category_id, event_id) VALUES
(3, 1),(3, 2),(3, 18),   -- Tech
(7, 3),(7, 12),(7, 13),  -- Business
(7, 4),                   -- Business (finance workshop)
(1, 5),(1, 6),(1, 7),    -- Music
(5, 8),(5, 9),(5, 20),   -- Spiritual
(4, 10),(4, 11),(4, 19), -- Sports
(6, 14),(6, 15),         -- Cooking
(2, 16),(2, 17),         -- Education
(3, 12),                  -- Tech (PM Masterclass has tech overlap)
(2, 4);                   -- Education (financial literacy)

-- ── Seats (10 per event, rows A & B) ────────────────────────
INSERT IGNORE INTO seats (event_id, label, status, version) VALUES
-- Event 1
(1,'A1','OPEN',0),(1,'A2','OPEN',0),(1,'A3','OPEN',0),(1,'A4','OPEN',0),(1,'A5','OPEN',0),
(1,'B1','OPEN',0),(1,'B2','BOOKED',0),(1,'B3','OPEN',0),(1,'B4','OPEN',0),(1,'B5','OPEN',0),
-- Event 2
(2,'A1','OPEN',0),(2,'A2','OPEN',0),(2,'A3','OPEN',0),(2,'A4','OPEN',0),(2,'A5','OPEN',0),
(2,'B1','OPEN',0),(2,'B2','OPEN',0),(2,'B3','OPEN',0),(2,'B4','OPEN',0),(2,'B5','OPEN',0),
-- Event 3
(3,'A1','OPEN',0),(3,'A2','OPEN',0),(3,'A3','BOOKED',0),(3,'A4','OPEN',0),(3,'A5','OPEN',0),
(3,'B1','OPEN',0),(3,'B2','OPEN',0),(3,'B3','OPEN',0),(3,'B4','OPEN',0),(3,'B5','OPEN',0),
-- Event 4
(4,'A1','OPEN',0),(4,'A2','OPEN',0),(4,'A3','OPEN',0),(4,'A4','OPEN',0),(4,'A5','OPEN',0),
(4,'B1','OPEN',0),(4,'B2','OPEN',0),(4,'B3','BOOKED',0),(4,'B4','OPEN',0),(4,'B5','OPEN',0),
-- Event 5
(5,'A1','OPEN',0),(5,'A2','OPEN',0),(5,'A3','OPEN',0),(5,'A4','OPEN',0),(5,'A5','OPEN',0),
(5,'B1','BOOKED',0),(5,'B2','OPEN',0),(5,'B3','OPEN',0),(5,'B4','OPEN',0),(5,'B5','OPEN',0),
-- Event 6
(6,'A1','OPEN',0),(6,'A2','OPEN',0),(6,'A3','OPEN',0),(6,'A4','OPEN',0),(6,'A5','OPEN',0),
(6,'B1','OPEN',0),(6,'B2','OPEN',0),(6,'B3','OPEN',0),(6,'B4','OPEN',0),(6,'B5','OPEN',0),
-- Event 7
(7,'A1','OPEN',0),(7,'A2','OPEN',0),(7,'A3','OPEN',0),(7,'A4','OPEN',0),(7,'A5','OPEN',0),
(7,'B1','OPEN',0),(7,'B2','OPEN',0),(7,'B3','OPEN',0),(7,'B4','OPEN',0),(7,'B5','OPEN',0),
-- Event 8
(8,'A1','OPEN',0),(8,'A2','OPEN',0),(8,'A3','OPEN',0),(8,'A4','OPEN',0),(8,'A5','OPEN',0),
(8,'B1','OPEN',0),(8,'B2','BOOKED',0),(8,'B3','OPEN',0),(8,'B4','OPEN',0),(8,'B5','OPEN',0),
-- Event 9
(9,'A1','OPEN',0),(9,'A2','OPEN',0),(9,'A3','OPEN',0),(9,'A4','OPEN',0),(9,'A5','OPEN',0),
(9,'B1','OPEN',0),(9,'B2','OPEN',0),(9,'B3','OPEN',0),(9,'B4','OPEN',0),(9,'B5','OPEN',0),
-- Event 10
(10,'A1','OPEN',0),(10,'A2','OPEN',0),(10,'A3','OPEN',0),(10,'A4','OPEN',0),(10,'A5','OPEN',0),
(10,'B1','OPEN',0),(10,'B2','OPEN',0),(10,'B3','OPEN',0),(10,'B4','OPEN',0),(10,'B5','OPEN',0);

-- ── Bookings (a few confirmed bookings for realism) ──────────
INSERT IGNORE INTO bookings (booking_id, user_id, event_id, seat_id, status, created_at) VALUES
(1, 1, 1,  2,  'CONFIRMED', NOW()),
(2, 2, 3,  23, 'CONFIRMED', NOW()),
(3, 3, 4,  38, 'CONFIRMED', NOW()),
(4, 4, 5,  46, 'CONFIRMED', NOW()),
(5, 5, 8,  72, 'CONFIRMED', NOW());

-- ── Payments ─────────────────────────────────────────────────
INSERT IGNORE INTO payments (payment_id, user_id, booking_id, amount, status, provider, provider_txn_id, idempotency_key, created_at) VALUES
(1, 1, 1, 199.00, 'SUCCESS', 'Razorpay', 'pay_RZP001ABCbng', 'idem_bkg_001_usr_001', NOW()),
(2, 2, 2, 499.00, 'SUCCESS', 'Razorpay', 'pay_RZP002DEFbng', 'idem_bkg_002_usr_002', NOW()),
(3, 3, 3, 299.00, 'SUCCESS', 'Razorpay', 'pay_RZP003GHIbng', 'idem_bkg_003_usr_003', NOW()),
(4, 4, 4, 150.00, 'SUCCESS', 'Razorpay', 'pay_RZP004JKLbng', 'idem_bkg_004_usr_004', NOW()),
(5, 5, 5, 0.00,   'SUCCESS', 'Razorpay', 'pay_RZP005MNObng', 'idem_bkg_005_usr_005', NOW());

-- ── Search History ───────────────────────────────────────────
INSERT IGNORE INTO searchs (user_id, category_id, searched_at) VALUES
(1, 3, NOW()),(1, 7, NOW()),
(2, 1, NOW()),(2, 6, NOW()),
(3, 3, NOW()),(3, 2, NOW()),
(4, 4, NOW()),(4, 1, NOW()),
(5, 7, NOW()),(5, 3, NOW()),
(6, 5, NOW()),(6, 6, NOW()),
(7, 2, NOW()),(7, 3, NOW()),
(8, 1, NOW()),(8, 5, NOW()),
(9, 4, NOW()),(9, 2, NOW()),
(10,6, NOW()),(10,7, NOW());

-- ── Notifications ────────────────────────────────────────────
INSERT IGNORE INTO notifications (user_id, type, seen, send_at) VALUES
(1, 'SUCCESS', TRUE,  NOW()),
(2, 'SUCCESS', TRUE,  NOW()),
(3, 'SUCCESS', FALSE, NOW()),
(4, 'SUCCESS', FALSE, NOW()),
(5, 'SUCCESS', TRUE,  NOW()),
(1, 'WARNING', FALSE, NOW()),
(3, 'FAILED',  FALSE, NOW());
