const express = require('express');
require('dotenv').config();
const cors = require('cors');
const gatewayRoutes = require('./routes/gateway');

const app = express();

app.use(cors({
    origin: '*', // Allow all origins. Change this to specific domains in production for security.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials such as cookies or authorization headers
    allowedHeaders: 'Content-Type, Authorization'
  }));

// Use the gateway routes to proxy requests
app.use('/api', gatewayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
