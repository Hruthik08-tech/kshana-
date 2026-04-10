// database/cache/redis.js
// Seeds live parking spot counts into Redis from MongoDB data
// Uses SET only if key does NOT already exist (idempotent)

const { ParkingSpot } = require('../mongodb/seed');

async function seedRedis(redisClient) {
  const spots = await ParkingSpot.find({});

  let seeded = 0;

  for (const spot of spots) {
    const key2 = `parking:${spot.parking_id}:available_2_wheeler`;
    const key4 = `parking:${spot.parking_id}:available_4_wheeler`;

    // SET NX — only sets if key does not exist
    const set2 = await redisClient.setnx(key2, spot.total_spots_2_wheeler);
    const set4 = await redisClient.setnx(key4, spot.total_spots_4_wheeler);

    if (set2 || set4) seeded++;
  }

  console.log(`✅ Redis: parking counts seeded for ${seeded} new spots (existing keys untouched).`);
}

module.exports = { seedRedis };
