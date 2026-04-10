require("dotenv").config();
const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "auth_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert callback pool to promise based pool
const promisePool = pool.promise();

// Initialize the database table if it doesn't exist
const initDb = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                email VARCHAR(200) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await promisePool.query(createTableQuery);
        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Error initializing database:\n", err);
    }
};

initDb();

module.exports = promisePool;
