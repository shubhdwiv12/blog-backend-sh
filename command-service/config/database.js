const { Sequelize } = require('sequelize');

// Initialize the Sequelize instance with PostgreSQL connection
console.log("scsxsc--->", process.env.DB_NAME,process.env.DB_USER )
const sequelize = new Sequelize(
  String(process.env.DB_NAME),        // Database name
  String(process.env.DB_USER),        // Database username
  String(process.env.DB_PASSWORD),    // Database password (ensure this is set)
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Ensure the correct port (5433 in your case)
    dialect: 'postgres'
  }
);

module.exports = sequelize;