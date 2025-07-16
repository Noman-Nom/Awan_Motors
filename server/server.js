const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const carRoutes = require('./routes/cars');
const customerRoutes = require('./routes/customers');
const bookingRoutes = require('./routes/bookings');

app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Awan Motors Rent-A-Car Backend is Running 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
