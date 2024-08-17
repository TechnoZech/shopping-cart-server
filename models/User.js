// models/User.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
	productId: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	image: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	firebaseUid: { type: String, required: true, unique: true },
	cart: [CartItemSchema],
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
