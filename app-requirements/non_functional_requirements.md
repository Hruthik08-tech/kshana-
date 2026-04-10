# Non-Functional Requirements
## Real-Time Event Booking & Parking Availability App

---

## 1. Performance
- Discover screen should load within 2 seconds under normal load
- Seat lock write must complete within 500ms to avoid UI lag during booking
- Parking availability updates via WebSocket should reflect within 1 second
- Redis read/write operations should complete under 10ms

## 2. Scalability
- System should handle 1,000 concurrent users without degradation
- Architecture is designed to scale to 1,000,000 users with:
  - Horizontal scaling of baseline and personalization workers
  - Redis handling all high-frequency atomic parking writes
  - NoSQL for static data that never becomes a write bottleneck
- Frontend filtering offloads category/distance filter load entirely from backend

## 3. Availability
- Redis crash recovery: seed available spots from NoSQL on restart
- Production path: Redis AOF persistence for zero data loss
- System should gracefully degrade — if personalization worker is slow, return baseline results

## 4. Consistency
- Seat booking uses optimistic locking (version field) to prevent double booking
- Seat unique index on bookings table as hard database-level constraint
- Payment uses idempotency_key to prevent double charge
- Redis INCR/DECR is atomic — concurrent parking spot updates are safe

## 5. Security
- All endpoints protected by auth middleware
- Rate limiter prevents abuse and brute force
- Passwords stored hashed (not plain text)
- Payment handled via Razorpay — no raw card data stored

## 6. Reliability
- Seat lock auto-expires after 2 minutes (lazy release on next booking attempt)
- No orphaned locked seats — lazy release query cleans up on every booking request
- Notification system covers all critical user-facing events

## 7. Maintainability
- Clear separation of concerns: baseline worker, personalization worker, parking worker are independent
- Static data (NoSQL) and dynamic data (Redis) are deliberately separated
- Scoring weights in personalization worker are tunable constants

## 8. Data Integrity
- Seat uniqueness enforced at DB level: (event_id, label) unique index
- Booking uniqueness enforced at DB level: (seat_id) unique index
- User preference uniqueness enforced: (user_id, category_id) unique index

## 9. Hackathon Scope Notes
- Redis replica not implemented — noted as production improvement
- Redis AOF not enabled — seed-on-restart used instead
- Seat lock timeout set to 2 minutes (production would use 5 minutes)
- Payment integration can be mocked for demo purposes
