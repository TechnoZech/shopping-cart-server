const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import custom modules
const initializeFirebaseAdmin = require('./config/firebase');
const userRoutes = require('./routes/users');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});