-- ============================================================
-- schema.sql — Event Booking App
-- Run via: node database/setup.js
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  category_id     INT AUTO_INCREMENT PRIMARY KEY,
  category_name   VARCHAR(200) NOT NULL UNIQUE,
  category_weight DECIMAL(4,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  user_id    INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  email      VARCHAR(200) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_preferences (
  preference_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL UNIQUE,
  max_distance  DECIMAL(5,2) NOT NULL DEFAULT 2.0,
  address       VARCHAR(300),
  lat           DECIMAL(10,7),
  lon           DECIMAL(10,7),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS user_preferred_categories (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  category_id INT NOT NULL,
  UNIQUE KEY uq_user_category (user_id, category_id),
  FOREIGN KEY (user_id)     REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS locations (
  location_id INT AUTO_INCREMENT PRIMARY KEY,
  address     VARCHAR(300) NOT NULL UNIQUE,
  lat         DECIMAL(10,7) NOT NULL,
  lon         DECIMAL(10,7) NOT NULL
);

CREATE TABLE IF NOT EXISTS organisations (
  org_id      INT AUTO_INCREMENT PRIMARY KEY,
  location_id INT NOT NULL,
  title       VARCHAR(500) NOT NULL,
  rating      DECIMAL(3,2),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE IF NOT EXISTS events (
  event_id    INT AUTO_INCREMENT PRIMARY KEY,
  org_id      INT NOT NULL,
  location_id INT NOT NULL,
  title       VARCHAR(500) NOT NULL,
  description TEXT,
  rating      DECIMAL(3,2) NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  date        DATE NOT NULL,
  start_time  TIMESTAMP NOT NULL,
  end_time    TIMESTAMP NOT NULL,
  FOREIGN KEY (org_id)      REFERENCES organisations(org_id),
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE IF NOT EXISTS category_events (
  category_event_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id       INT NOT NULL,
  event_id          INT NOT NULL,
  UNIQUE KEY uq_category_event (category_id, event_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id),
  FOREIGN KEY (event_id)    REFERENCES events(event_id)
);

CREATE TABLE IF NOT EXISTS seats (
  seat_id      INT AUTO_INCREMENT PRIMARY KEY,
  event_id     INT NOT NULL,
  label        VARCHAR(10) NOT NULL,
  status       ENUM('OPEN','LOCKED','BOOKED') NOT NULL DEFAULT 'OPEN',
  version      INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY uq_event_seat (event_id, label),
  FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  event_id   INT NOT NULL,
  seat_id    INT NOT NULL,
  status     ENUM('PENDING','CONFIRMED','CANCELLED') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_seat_booking (seat_id),
  FOREIGN KEY (user_id)  REFERENCES users(user_id),
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (seat_id)  REFERENCES seats(seat_id)
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id      INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL,
  booking_id      INT NOT NULL,
  amount          DECIMAL(10,2) NOT NULL,
  status          ENUM('PENDING','SUCCESS','FAILED') NOT NULL,
  provider        VARCHAR(100),
  provider_txn_id VARCHAR(255),
  idempotency_key VARCHAR(255) NOT NULL UNIQUE,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(user_id),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

CREATE TABLE IF NOT EXISTS searchs (
  search_id   INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  category_id INT NOT NULL,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_searched (user_id, searched_at),
  FOREIGN KEY (user_id)     REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  not_id  INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type    ENUM('SUCCESS','FAILED','WARNING') NOT NULL,
  seen    BOOLEAN NOT NULL DEFAULT FALSE,
  send_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  seen_at TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
