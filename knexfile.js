// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4",  // Set the character set to utf8mb4
    // collation: "utf8mb4_unicode_ci",  // Set the collation to support full Unicode, including emojis
  },
};