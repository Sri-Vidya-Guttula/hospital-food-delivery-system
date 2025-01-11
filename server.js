require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const managerRoutes = require('./routes/managerRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/manager', managerRoutes);
app.use('/api/pantry', pantryRoutes);
// app.use('/api/delivery', deliveryRoutes);

// Error handler
app.use(errorHandler);

// Connect to DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
