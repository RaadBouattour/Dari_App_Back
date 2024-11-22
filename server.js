// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const houseRoutes = require('./routes/houseRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const commentRoutes = require('./routes/Commentroutes');
const authRoutes=require('./routes/auth');
const checkDbRoutes = require('./routes/checkDbRoutes');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

if (!process.env.MONGODB_URI || !process.env.STRIPE_SECRET_KEY) {
  console.error('Missing essential environment variables: MONGODB_URI or STRIPE_SECRET_KEY');
  process.exit(1); 
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Database connection
connectDB();

// Routes for handling API requests
app.use('/houses', houseRoutes);
app.use('/', reservationRoutes);
app.use('/payments', paymentRoutes);
app.use('/auth', authRoutes);
app.use('/housesComment', commentRoutes)

app.use('/db', checkDbRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


