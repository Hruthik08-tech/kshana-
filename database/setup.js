// database/setup.js
// Run ONCE on fresh clone or full DB wipe:  node database/setup.js
// Never run this inside service startup files.

require('dotenv').config();

const fs        = require('fs');
const path      = require('path');
const mysql     = require('mysql2/promise');
const mongoose  = require('mongoose');
const Redis     = require('ioredis');

const { seedMongoDB } = require('./mongodb/seed');
const { seedRedis }   = require('./cache/redis');

async function setup() {

  // ── 1. MySQL ───────────────────────────────────────────────
  console.log('⏳ MySQL: connecting...');
  const connection = await mysql.createConnection({
    host:               process.env.MYSQL_HOST     || 'localhost',
    port:               process.env.MYSQL_PORT     || 3306,
    user:               process.env.MYSQL_USER     || 'root',
    password:           process.env.MYSQL_PASSWORD || '',
    database:           process.env.MYSQL_DATABASE || 'eventapp',
    multipleStatements: true,
  });

  const schema = fs.readFileSync(path.join(__dirname, 'mysql/schema.sql'), 'utf8');
  const seed   = fs.readFileSync(path.join(__dirname, 'mysql/seed.sql'),   'utf8');

  await connection.query(schema);
  console.log('✅ MySQL: schema applied.');

  await connection.query(seed);
  console.log('✅ MySQL: seed data inserted.');

  await connection.end();

  // ── 2. MongoDB ─────────────────────────────────────────────
  console.log('⏳ MongoDB: connecting...');
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/eventapp'
  );
  console.log('✅ MongoDB: connected.');

  await seedMongoDB();

  // ── 3. Redis ───────────────────────────────────────────────
  console.log('⏳ Redis: connecting...');
  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  });

  await seedRedis(redisClient);

  // ── Cleanup ────────────────────────────────────────────────
  await mongoose.disconnect();
  redisClient.disconnect();

  console.log('\n🚀 All databases ready. Setup complete.');
  process.exit(0);
}

setup().catch((err) => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
