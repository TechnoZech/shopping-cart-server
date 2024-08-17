const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import custom modules
const initializeFirebaseAdmin = require("./config/firebase");
const userRoutes = require("./routes/users");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// ! Cors
app.use(cors({ origin: process.env.CORS_URI, credentials: true }));

// Initialize Firebase Admin SDK
initializeFirebaseAdmin();

// ! database connection using Mongoose
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("mongoose db Connected!");
	})
	.catch((error) => {
		console.log(error);
	});

// Routes
app.use("/api/users", userRoutes);
app.get("/", function (req, res) {
	res.send("server is working");
});
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
