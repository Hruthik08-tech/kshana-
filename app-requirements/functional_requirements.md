# Functional Requirements
## Real-Time Event Booking & Parking Availability App

---

## 1. User Authentication
- User can register with name, email, and password
- User can log in and receive an auth token
- All requests pass through auth middleware and rate limiter
- On first login, user is taken through onboarding flow (cold start handling)

---

## 2. Cold Start — User Onboarding
- After signup, user is asked:
  - Preferred event categories (multi-select)
  - Default address (lat/lon saved to user_preferences)
  - Default discovery distance (default: 2km if not specified)
- If user skips onboarding entirely, system defaults to 2km radius, no category filter
- Preferences stored in `user_preferences` and `user_preferred_categories` tables

---

## 3. Event Discovery
- User hits Discover button
- System uses user's live lat/lon passed in every request
- If location permission denied, falls back to saved address in user_preferences

### Baseline Worker
- Queries events within user's set distance (default 2km) using lat/lon from locations table
- Scores each event using category_weight from categories table
- Passes scored results to Personalization Worker

### Personalization Worker
- Receives baseline scored events
- Applies weighted scoring on top:
  - +0.5 weight — matches user's preferred categories (explicit intent, highest trust)
  - +0.3 weight — matches user's recent search history (recent implicit intent)
  - +0.2 weight — matches user's past booking history (past behaviour, lowest trust)
- Returns final ranked list to frontend

---

## 4. Event Filtering
- User can filter by category or distance on the Discover screen
- Filter by category → handled entirely on frontend (no new backend request)
- Filter within original distance → handled entirely on frontend
- Filter beyond original fetched distance → new backend request triggered
- No Redis caching needed for filtering — frontend holds its own data in browser memory
- Each user's browser holds only their own data (isolated, no shared memory concern)

---

## 5. Seat Booking Flow
- User selects a seat on event detail screen
- Before processing, system runs lazy seat release:
  - Any seat with status = LOCKED and locked_until < NOW() is reset to OPEN
- System attempts to lock seat:
  - Success → seat status = LOCKED, locked_until = now + 2 minutes
  - Fail (already locked/booked) → user sees "seat unavailable"
- Locked user proceeds to payment within 2-minute window (timer shown on UI)
- On payment success → seat status = BOOKED, booking confirmed, QR code generated
- On payment fail or timeout → seat status = OPEN, seat released for others

### Concurrency — Two Users, Last Seat
- Both users hit lock simultaneously
- One wins (DB write succeeds), other gets immediate "seat unavailable"
- Optimistic locking via `version` field on seats table prevents race condition

---

## 6. Payment Flow
- Payment initiated after seat is locked
- Payment provider: Razorpay (or mock for hackathon)
- `idempotency_key` on payments table prevents double payment
- On SUCCESS → booking status = CONFIRMED, notification sent, QR generated
- On FAILED → booking status stays PENDING, notification sent, seat released
- On timeout (2 min expires) → seat released, user notified

---

## 7. Notifications
Triggered automatically on these events:

| Event | Type | Message |
|---|---|---|
| Payment success | SUCCESS | Booking confirmed + QR code |
| Payment failed | FAILED | Payment failed, please retry |
| Seat lock expired (2 min) | WARNING | Seat released, try again |
| Booking cancelled | WARNING | Cancellation confirmed |

---

## 8. Parking Availability
- Parking Worker queries NoSQL parking database for spots within 2km of user
- Static parking data (location, type, pricing) lives in NoSQL only
- Dynamic availability (available spots) lives in Redis only — NoSQL is never written to for availability
- Redis uses atomic INCR/DECR for spot count updates — safe for concurrent users
- WebSocket connection between backend and frontend broadcasts real-time spot changes
- On Redis restart → seed available spots = total spots from NoSQL (acceptable for hackathon)
- Production path: enable Redis AOF persistence (`appendonly yes`) for zero data loss on restart

---

## 9. Search History
- Every category search is logged to `searches` table with user_id, category_id, searched_at
- Used by Personalization Worker for ranking
- Index on (user_id, searched_at) for fast recent-search queries

---

## 10. Profile & Preferences
- User can update preferred categories
- User can update default address and distance
- User can view booking history

---

## Key Clarifications & Decisions Made

**Why no separate seat release worker?**
Lazy release on next booking attempt is sufficient and simpler. No cron job or extra worker needed.

**Why frontend filtering?**
Each user's browser holds only their own 50-100 events. Browser memory is isolated per user. 1 million users = 1 million separate browsers, not 1 million entries in one place. Zero server burden.

**Why Redis for parking, not NoSQL?**
NoSQL holds static data. Redis atomic ops handle concurrent spot updates safely. Mixing writes into NoSQL would create race conditions and overload it.

**Why pass lat/lon on every request?**
User can be anywhere. Saved address is only a fallback. Live location gives accurate discovery results.
