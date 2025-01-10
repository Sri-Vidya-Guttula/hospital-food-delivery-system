const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Add your MongoDB connection logic here)
const connectDB = require('./config/mongodb');
connectDB();

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/pantry', require('./routes/pantryRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
