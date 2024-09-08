const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoutes = require('./routes/blog');
const {runConsumer}= require('./services/eventConsumer')

const app = express();
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/v1/blogs', blogRoutes);

runConsumer()

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Command Service running on port ${PORT}`);
});
