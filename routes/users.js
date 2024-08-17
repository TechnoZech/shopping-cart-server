const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { email, uid } = req.user;

    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      // User already exists, update email if it has changed
      if (user.email !== email) {
        user.email = email;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        email,
        firebaseUid: uid,
      });
      await user.save();
    }

    res.status(200).json({ message: 'User info stored successfully', user });
  } catch (error) {
    console.error('Error storing user info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;