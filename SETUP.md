# FANTOM — Real-Time Event Booking & Parking Availability

A full-stack platform that lets users discover nearby events, book tickets with
real-time seat availability, and find parking near venues — all powered by
personalized recommendations and live data.

---

## Folder Structure

```
root/
├── auth-gateway/               — Standalone JWT auth service (token validation)
│   ├── middleware/
│   │   └── auth.js             — JWT verification middleware
│   ├── index.js                — Express entry point
│   └── .env                    — PORT only
│
├── backend/                    — Main API server (Express)
│   ├── src/
│   │   ├── config/             — Database connection (mysql2 pool)
│   │   ├── controllers/        — Request handlers (auth logic lives here)
│   │   ├── routes/             — API route definitions
│   │   ├── models/             — Data access layer (MySQL queries)
│   │   ├── services/           — Business logic helpers (QR, notifications)
│   │   └── websocket/          — Real-time parking updates via WebSocket
│   ├── config/                 — (legacy) Original DB config location
│   ├── controllers/            — (legacy) Original auth controller location
│   ├── middlewares/            — (legacy) Original auth middleware location
│   ├── routes/                 — (legacy) Original auth routes location
│   ├── index.js                — Express entry point
│   └── .env                    — DB creds, PORT, JWT_SECRET
│
├── worker-baseline/            — Python Flask worker for baseline scoring
│   ├── app.py                  — Flask entry point
│   ├── routes/score.py         — POST /score endpoint
│   ├── services/scorer.py      — Scoring algorithm
│   ├── config/db.py            — MySQL connection
│   ├── requirements.txt        — Python dependencies
│   └── .env                    — DB creds, PORT
│
├── worker-personalization/     — Python Flask worker for personalized re-ranking
│   ├── app.py                  — Flask entry point
│   ├── routes/personalize.py   — POST /personalize endpoint
│   ├── services/ranker.py      — Re-ranking algorithm
│   ├── config/db.py            — MySQL connection
│   ├── requirements.txt        — Python dependencies
│   └── .env                    — DB creds, PORT
│
├── worker-parking/             — Python Flask worker for parking availability
│   ├── app.py                  — Flask entry point
│   ├── routes/parking.py       — GET /parking endpoint
│   ├── services/availability.py — Redis INCR/DECR live counts
│   ├── config/redis.py         — Redis connection
│   ├── config/nosql.py         — NoSQL connection (lot metadata)
│   ├── requirements.txt        — Python dependencies
│   └── .env                    — Redis, NoSQL, PORT
│
├── frontend/                   — React (Vite) client app
│
├── database/
│   ├── schema.sql              — Full MySQL schema (all tables)
│   ├── migrations/
│   │   └── 001_create_users.sql — Already applied, documented
│   └── seeds/
│       └── categories.sql      — Default event categories
│
├── wireframes/                 — UI wireframe assets
├── app-requirements/           — Product requirement docs
└── README.md                   — This file
```

---

## How to Run Each Service

### 1. Backend (Express API)

```bash
cd backend
npm install
# Fill in .env with your DB creds and JWT secret
node index.js
# Runs on http://localhost:5000
```

### 2. Auth Gateway

```bash
cd auth-gateway
npm install express dotenv jsonwebtoken
# Set PORT in .env (default: 4000)
node index.js
# Runs on http://localhost:4000
```

### 3. Frontend (React Vite)

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Worker — Baseline Scorer

```bash
cd worker-baseline
pip install -r requirements.txt
# Fill in .env with DB creds
python app.py
# Runs on http://localhost:6001
```

### 5. Worker — Personalization

```bash
cd worker-personalization
pip install -r requirements.txt
# Fill in .env with DB creds
python app.py
# Runs on http://localhost:6002
```

### 6. Worker — Parking

```bash
cd worker-parking
pip install -r requirements.txt
# Fill in .env with Redis + NoSQL URIs
python app.py
# Runs on http://localhost:6003
```

### 7. Database Setup

```bash
# Connect to your MySQL server, then:
mysql -u root -p < database/schema.sql
mysql -u root -p fantom_db < database/seeds/categories.sql
```

---

## Environment Variables

| Service                    | Variable      | Purpose                    |
| -------------------------- | ------------- | -------------------------- |
| **backend**                | `PORT`        | Express server port (5000) |
|                            | `DB_HOST`     | MySQL host                 |
|                            | `DB_USER`     | MySQL username             |
|                            | `DB_PASSWORD` | MySQL password             |
|                            | `DB_NAME`     | MySQL database name        |
|                            | `JWT_SECRET`  | Secret for signing JWTs    |
| **auth-gateway**           | `PORT`        | Gateway server port (4000) |
| **worker-baseline**        | `PORT`        | Worker port (6001)         |
|                            | `DB_HOST`     | MySQL host                 |
|                            | `DB_USER`     | MySQL username             |
|                            | `DB_PASSWORD` | MySQL password             |
|                            | `DB_NAME`     | MySQL database name        |
| **worker-personalization** | `PORT`        | Worker port (6002)         |
|                            | `DB_HOST`     | MySQL host                 |
|                            | `DB_USER`     | MySQL username             |
|                            | `DB_PASSWORD` | MySQL password             |
|                            | `DB_NAME`     | MySQL database name        |
| **worker-parking**         | `PORT`        | Worker port (6003)         |
|                            | `REDIS_HOST`  | Redis host                 |
|                            | `REDIS_PORT`  | Redis port (6379)          |
|                            | `REDIS_DB`    | Redis database index       |
|                            | `NOSQL_URI`   | NoSQL connection URI       |
|                            | `NOSQL_DB`    | NoSQL database name        |

> Never commit `.env` files with real credentials. Use `.env.example` templates.

---

## How Services Talk to Each Other

```
┌──────────────┐
│   Frontend   │  (React Vite — port 5173)
│              │
└──────┬───────┘
       │  HTTP requests
       ▼
┌──────────────┐     JWT validation     ┌────────────────┐
│   Backend    │ ◄──────────────────── │  Auth Gateway   │
│  (Express)   │                        │  (port 4000)    │
│  port 5000   │                        └────────────────┘
└──┬───┬───┬───┘
   │   │   │
   │   │   │  Internal HTTP calls
   │   │   │
   │   │   ▼
   │   │  ┌─────────────────────┐
   │   │  │  worker-baseline    │  Baseline event scoring
   │   │  │  (Flask — port 6001)│
   │   │  └─────────────────────┘
   │   ▼
   │  ┌──────────────────────────┐
   │  │ worker-personalization   │  User-specific re-ranking
   │  │ (Flask — port 6002)      │
   │  └──────────────────────────┘
   ▼
  ┌─────────────────────┐
  │  worker-parking      │  Live parking availability
  │  (Flask — port 6003) │
  └───┬──────────┬───────┘
      │          │
      ▼          ▼
  ┌────────┐ ┌────────┐
  │ Redis  │ │ NoSQL  │
  │(counts)│ │(static)│
  └────────┘ └────────┘

      All services connect to ──► MySQL (shared database)
```

**Flow:**

1. Frontend sends requests to Backend.
2. Backend validates tokens via Auth Gateway middleware.
3. Backend calls worker-baseline to score events, then worker-personalization to re-rank.
4. Backend/Frontend queries worker-parking for live parking, also receives updates via WebSocket.
5. All services read/write to a shared MySQL database. Parking worker additionally uses Redis for live counts and NoSQL for static lot data.

---

## 🚀 Git Setup & GitHub Push

This project is now ready to be pushed to GitHub. Follow these steps:

1. **Add all files to stage:**

   ```bash
   git add .
   ```

2. **Commit the changes:**

   ```bash
   git commit -m "initial commit: project structure and services"
   ```

3. **Create a new repository on GitHub**, then link and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/FANTOM-CODE.git
   git branch -M main
   git push -u origin main
   ```

> [!IMPORTANT]
> A root `.gitignore` and `.env.example` files have been created to ensure your credentials stay private. Never push your actual `.env` files.
