# System Workflow Architecture
## Real-Time Event Booking & Parking Availability App

---

## System Components

```
Client (mobile/web)
  └── Auth Middleware + Rate Limiter
        ├── Baseline Worker
        │     └── Personalization Worker
        ├── Parking Worker
        │     ├── NoSQL (static parking data)
        │     └── Redis Cache (live spot counts)
        └── RDBMS (users, events, bookings, payments)

WebSocket: Redis ←→ Backend ←→ Frontend (real-time parking)
```

---

## 1. Discovery Workflow

```
User hits Discover
  → Request carries live lat/lon + auth token
  → Auth middleware validates token
  → Baseline Worker:
      1. Query events within user's distance (default 2km) via locations table
      2. Score each event using category_weight
      3. Pass scored list to Personalization Worker
  → Personalization Worker:
      1. Query user_preferred_categories → apply +0.5 weight on category match
      2. Query searches (recent) → apply +0.3 weight on category match
      3. Query bookings + events (history) → apply +0.2 weight on category match
      4. final_score = baseline_score + preference_weight + search_weight + booking_weight
  → Return ranked event list to frontend
```

**Edge Cases:**
- New user, no history → only preferred categories weight applies, baseline carries result
- User with nothing set → pure baseline score, nearest highest rated events returned
- Location permission denied → fallback to saved address in user_preferences

---

## 2. Filtering Workflow

```
User changes category or distance filter on Discover screen
  → If category filter OR distance within original fetch radius:
      → Frontend filters already-loaded events
      → No backend call, no Redis, instant re-render
  → If distance beyond original fetch radius:
      → New backend request triggered with new distance
      → Full discovery workflow runs again
```

**Why this works:**
Each user's browser holds only their own 50-100 events in local memory.
Browser memory is isolated per user. 1M users = 1M separate browsers.
Zero server burden for standard filtering.

---

## 3. Booking Workflow

```
User selects a seat
  → Lazy release runs first:
      UPDATE seats SET status='OPEN'
      WHERE status='LOCKED' AND locked_until < NOW()
  → Attempt seat lock:
      → Check seat status = OPEN
      → Write: status=LOCKED, locked_until=NOW()+2min, version+1
      → Uses optimistic locking (version field) for concurrency safety

Two users hit last seat simultaneously:
  → One wins DB write (version matches)
  → Other gets conflict → immediate "seat unavailable" shown

Winner proceeds:
  → 2-minute countdown timer shown on UI
  → User completes payment within window
  → On success → seat status=BOOKED, booking status=CONFIRMED
  → On fail or timeout → seat status=OPEN, released for others
```

**No separate release worker needed.**
Lazy release on every booking attempt handles cleanup naturally.

---

## 4. Payment Workflow

```
Seat is locked → Payment screen opens
  → Payment request sent with idempotency_key (prevents double charge)
  → Razorpay (or mock) processes payment
  → On SUCCESS:
      → booking status = CONFIRMED
      → seat status = BOOKED
      → QR code generated with booking details
      → Notification: SUCCESS — "Booking confirmed"
  → On FAILED:
      → booking status stays PENDING
      → seat status = OPEN (released)
      → Notification: FAILED — "Payment failed, please retry"
  → On TIMEOUT (2 min lock expires before payment):
      → seat status = OPEN (lazy release on next request)
      → Notification: WARNING — "Seat released, try again"
```

---

## 5. Parking Workflow

```
Static data flow (one-time / infrequent):
  NoSQL → stores parking_id, location, type, pricing, total spots
  Never written to for real-time updates

Dynamic data flow (real-time):
  Parking Worker → queries NoSQL for spots within 2km
  → Seeds Redis: available_spots = total_spots (on first load or restart)
  → All spot count changes: Redis INCR / DECR (atomic, safe for concurrency)

Real-time display:
  Redis ←→ Backend WebSocket ←→ Frontend
  → Frontend shows live available spot count, updates instantly

Redis crash recovery:
  → On restart, seed available spots from NoSQL total_spots
  → Counts reset to full capacity (acceptable tradeoff for hackathon)
  → Production fix: appendonly yes in Redis config (AOF persistence)
```

---

## 6. Notification Workflow

```
Triggered automatically by system events:

Payment SUCCESS   → type=SUCCESS → "Booking confirmed + QR"
Payment FAILED    → type=FAILED  → "Payment failed, retry"
Lock EXPIRED      → type=WARNING → "Seat released, try again"
Booking CANCELLED → type=WARNING → "Cancellation confirmed"

Stored in notifications table with seen/seen_at for read tracking.
```

---

## Scoring Formula Reference

```
final_score = baseline_score
            + (category_match_preferred × 0.5)
            + (category_match_search    × 0.3)
            + (category_match_booking   × 0.2)
```

Weights are tunable. Logic: explicit intent > recent implicit > past behaviour.
