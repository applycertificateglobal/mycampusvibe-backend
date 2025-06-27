const express = require('express');
const router = express.Router();

// Sample booking route
router.get('/', (req, res) => {
  res.json({ message: "Bookings API working" });
});

module.exports = router;
