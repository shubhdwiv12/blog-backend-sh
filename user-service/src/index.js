const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for User Service');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
