// database/mongodb/seed.js
// Seeds static parking spot data into MongoDB
// All spots are near 12.8725, 77.5751 (Uttarahalli / JP Nagar, Bangalore)

const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  parking_id:             { type: String, required: true, unique: true },
  name:                   { type: String, required: true },
  lat:                    { type: Number, required: true },
  lon:                    { type: Number, required: true },
  type:                   { type: String, enum: ['PUBLIC', 'PRIVATE'], required: true },
  pricing_type:           { type: String, enum: ['FREE', 'PAID'],    required: true },
  price_2_wheeler:        { type: Number, default: null },
  price_4_wheeler:        { type: Number, default: null },
  total_spots_2_wheeler:  { type: Number, required: true },
  total_spots_4_wheeler:  { type: Number, required: true },
}, { collection: 'parking_spots' });

const ParkingSpot = mongoose.models.ParkingSpot || mongoose.model('ParkingSpot', parkingSpotSchema);

const spots = [
  {
    parking_id:            'park_001',
    name:                  'Forum Mall Parking, Koramangala',
    lat:                   12.9343,
    lon:                   77.6105,
    type:                  'PRIVATE',
    pricing_type:          'PAID',
    price_2_wheeler:       20,
    price_4_wheeler:       60,
    total_spots_2_wheeler: 120,
    total_spots_4_wheeler: 300,
  },
  {
    parking_id:            'park_002',
    name:                  'BBMP Public Parking, JP Nagar 6th Phase',
    lat:                   12.9050,
    lon:                   77.5750,
    type:                  'PUBLIC',
    pricing_type:          'FREE',
    price_2_wheeler:       null,
    price_4_wheeler:       null,
    total_spots_2_wheeler: 80,
    total_spots_4_wheeler: 40,
  },
  {
    parking_id:            'park_003',
    name:                  'MLR Convention Centre Parking, JP Nagar',
    lat:                   12.9072,
    lon:                   77.5715,
    type:                  'PRIVATE',
    pricing_type:          'PAID',
    price_2_wheeler:       10,
    price_4_wheeler:       40,
    total_spots_2_wheeler: 100,
    total_spots_4_wheeler: 150,
  },
  {
    parking_id:            'park_004',
    name:                  'Kanakapura Road BMTC Parking Lot',
    lat:                   12.8770,
    lon:                   77.5810,
    type:                  'PUBLIC',
    pricing_type:          'PAID',
    price_2_wheeler:       5,
    price_4_wheeler:       20,
    total_spots_2_wheeler: 200,
    total_spots_4_wheeler: 80,
  },
  {
    parking_id:            'park_005',
    name:                  'Gopalan Arcade Mall Parking, Banashankari',
    lat:                   12.9180,
    lon:                   77.5540,
    type:                  'PRIVATE',
    pricing_type:          'PAID',
    price_2_wheeler:       15,
    price_4_wheeler:       50,
    total_spots_2_wheeler: 90,
    total_spots_4_wheeler: 200,
  },
  {
    parking_id:            'park_006',
    name:                  'Kumaraswamy Layout Civic Parking',
    lat:                   12.8950,
    lon:                   77.5605,
    type:                  'PUBLIC',
    pricing_type:          'FREE',
    price_2_wheeler:       null,
    price_4_wheeler:       null,
    total_spots_2_wheeler: 60,
    total_spots_4_wheeler: 30,
  },
  {
    parking_id:            'park_007',
    name:                  'Banashankari BDA Complex Parking',
    lat:                   12.9240,
    lon:                   77.5535,
    type:                  'PUBLIC',
    pricing_type:          'PAID',
    price_2_wheeler:       5,
    price_4_wheeler:       15,
    total_spots_2_wheeler: 150,
    total_spots_4_wheeler: 60,
  },
  {
    parking_id:            'park_008',
    name:                  'Christ University Campus Parking, Hosur Road',
    lat:                   12.9160,
    lon:                   77.6095,
    type:                  'PRIVATE',
    pricing_type:          'PAID',
    price_2_wheeler:       10,
    price_4_wheeler:       30,
    total_spots_2_wheeler: 200,
    total_spots_4_wheeler: 250,
  },
  {
    parking_id:            'park_009',
    name:                  'Puttenahalli BBMP Street Parking',
    lat:                   12.8760,
    lon:                   77.5670,
    type:                  'PUBLIC',
    pricing_type:          'FREE',
    price_2_wheeler:       null,
    price_4_wheeler:       null,
    total_spots_2_wheeler: 40,
    total_spots_4_wheeler: 20,
  },
  {
    parking_id:            'park_010',
    name:                  'Uttarahalli Main Road Roadside Parking',
    lat:                   12.8705,
    lon:                   77.5785,
    type:                  'PUBLIC',
    pricing_type:          'FREE',
    price_2_wheeler:       null,
    price_4_wheeler:       null,
    total_spots_2_wheeler: 50,
    total_spots_4_wheeler: 25,
  },
  {
    parking_id:            'park_011',
    name:                  'Sarakki Market Parking, JP Nagar',
    lat:                   12.9195,
    lon:                   77.5748,
    type:                  'PUBLIC',
    pricing_type:          'PAID',
    price_2_wheeler:       5,
    price_4_wheeler:       20,
    total_spots_2_wheeler: 75,
    total_spots_4_wheeler: 35,
  },
  {
    parking_id:            'park_012',
    name:                  'Padmanabhanagar Shopping Complex Parking',
    lat:                   12.9085,
    lon:                   77.5575,
    type:                  'PRIVATE',
    pricing_type:          'PAID',
    price_2_wheeler:       10,
    price_4_wheeler:       30,
    total_spots_2_wheeler: 60,
    total_spots_4_wheeler: 80,
  },
];

async function seedMongoDB() {
  for (const spot of spots) {
    await ParkingSpot.updateOne(
      { parking_id: spot.parking_id },
      { $setOnInsert: spot },
      { upsert: true }
    );
  }
  console.log(`✅ MongoDB: ${spots.length} parking spots seeded (upserted, no duplicates).`);
}

module.exports = { seedMongoDB, ParkingSpot };
