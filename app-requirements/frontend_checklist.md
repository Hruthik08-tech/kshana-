# Frontend Checklist

## Real-Time Event Booking & Parking Availability App

---

## Page 1 — Onboarding (Cold Start)

Shown once after signup. Skippable — defaults apply if skipped.

- [ ] Multi-select preferred categories screen
- [ ] Address input field (saves lat/lon to user_preferences)
- [ ] Distance preference selector (default pre-filled as 2km)
- [ ] Skip button (applies all defaults silently)
- [ ] Save & Continue button

---

## Page 2 — Discover Screen

User goes to discover tab and hit discover button

- [ ] All the events will be displayed on the map, on click there will be pop up added
- [ ] The events will displayed in the side bar as well. User can open and close it
- [ ] Along with events parking spots near them will be visible
- [ ] User can click on any pop up marker and use it to book the events
- [ ] User can click on the parking pop up maker and see the live parking availability
- [ ] On a side bar all events will be loaded if they user want's to see them

---

## Page 3 — Event Detail Screen

Opened from an event card.

- [ ] Full event title, description, date/time
- [ ] Organisation name and rating
- [ ] Location (address + map pin optional)
- [ ] Seat map or seat list with status (OPEN / LOCKED / BOOKED)
- [ ] Select seat button (triggers lock flow)
- [ ] Nearby parking section (pulls from parking overlay — see Page 6)

---

## Page 4 — Seat Selection & Lock Screen

Shown after user taps a seat.

- [ ] Selected seat label shown (e.g. A12)
- [ ] 2-minute countdown timer (starts immediately on lock)
- [ ] "Proceed to Payment" button
- [ ] Warning if seat becomes unavailable (lost race condition)
- [ ] Timer expiry screen — "Seat released, try again" with back button

---

## Page 5 — Payment Screen

Shown after seat is locked.

- [ ] Booking summary (event, seat, amount)
- [ ] Timer still visible (remaining lock time)
- [ ] Pay button (Razorpay or mock integration)
- [ ] Payment success screen — booking confirmed + QR code displayed
- [ ] Payment failed screen — error message + retry option
- [ ] QR code contains: booking_id, event name, seat label, user name

---

## Page 7 — Notifications Screen

- [ ] List of all notifications in reverse chronological order
- [ ] SUCCESS type: green indicator — booking confirmed
- [ ] FAILED type: red indicator — payment failed
- [ ] WARNING type: yellow indicator — seat expired or booking cancelled
- [ ] Mark as seen on tap (updates seen + seen_at)
- [ ] Unread badge count on nav icon

---

## Page 8 — Booking History Screen

- [ ] List of all past and upcoming bookings
- [ ] Each item shows: event name, date, seat, status (CONFIRMED / CANCELLED / PENDING)
- [ ] Tap to view QR code for confirmed bookings
- [ ] Cancel booking option (where applicable)

---

## Page 9 — Profile / Settings Screen

- [ ] Display user name and email
- [ ] Edit preferred categories (multi-select, same as onboarding)
- [ ] Edit default address and distance
- [ ] Logout button

---

## Modals / Overlays

- [ ] Seat unavailable modal — shown when lock fails (another user won the race)
- [ ] Session expired modal — shown when auth token expires mid-flow
- [ ] Confirm cancel booking modal — "Are you sure?" before cancellation
- [ ] Location permission prompt — ask for live lat/lon, explain why it's needed

---

## Global UI Elements

- [ ] Bottom navigation: Discover / Parking / Bookings / Notifications / Profile
- [ ] Notification badge counter on nav icon
- [ ] Loading states on all data-fetching screens
- [ ] Error states with retry button on all screens
- [ ] Auth token attached to every API request header
- [ ] Live lat/lon attached to every Discover API request
