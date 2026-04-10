# Parking NoSQL Document Schema

## Purpose
Stores STATIC parking data only.
Dynamic availability (available spots) lives in Redis — NOT here.
This database is never written to for real-time updates.

---

## Collection: parking_spots

```json
{
  "parking_id": "string (unique)",
  "name": "string",
  "lat": "decimal",
  "lon": "decimal",
  "type": "PUBLIC | PRIVATE",
  "pricing_type": "FREE | PAID",
  "price_2_wheeler": "decimal | null",
  "price_4_wheeler": "decimal | null",
  "total_spots_2_wheeler": "integer",
  "total_spots_4_wheeler": "integer"
}
```

---

## Field Notes

| Field | Notes |
|---|---|
| parking_id | Unique identifier, used as Redis key prefix |
| type | PUBLIC or PRIVATE parking |
| pricing_type | FREE or PAID |
| price_2_wheeler | null if pricing_type is FREE |
| price_4_wheeler | null if pricing_type is FREE |
| total_spots_2_wheeler | Used to seed Redis on startup |
| total_spots_4_wheeler | Used to seed Redis on startup |

---

## Corresponding Redis Keys (Dynamic Layer)

```
parking:{parking_id}:available_2_wheeler  →  integer (atomic INCR/DECR)
parking:{parking_id}:available_4_wheeler  →  integer (atomic INCR/DECR)
```

---

## Redis Seeding on Restart

On Redis startup or crash recovery, seed from NoSQL:

```
For each document in parking_spots:
  SET parking:{parking_id}:available_2_wheeler = total_spots_2_wheeler
  SET parking:{parking_id}:available_4_wheeler = total_spots_4_wheeler
```

This resets live counts to full capacity.
Acceptable tradeoff for hackathon. Production fix: enable Redis AOF persistence.

---

## Example Document

```json
{
  "parking_id": "park_001",
  "name": "Forum Mall Parking",
  "lat": 12.9352,
  "lon": 77.6244,
  "type": "PRIVATE",
  "pricing_type": "PAID",
  "price_2_wheeler": 20.00,
  "price_4_wheeler": 50.00,
  "total_spots_2_wheeler": 100,
  "total_spots_4_wheeler": 200
}
```
