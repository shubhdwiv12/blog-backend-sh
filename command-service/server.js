require('dotenv').config()
const express = require('express');
const blogRoutes = require('./routes/blog');
const sequelize = require('./config/database');
const app = express();
app.use(express.json());

console.log('PostgreSQL Password:', process.env.DB_USER);
// Sync the Sequelize models to the PostgreSQL database
sequelize.sync().then(() => {
    console.log('PostgreSQL database synced');
}).catch((err) => {
    console.error('Error syncing PostgreSQL database:', err);
});

// Use the blog routes
app.use('/api/v1/blogs', blogRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Command Service running on port ${PORT}`);
});
