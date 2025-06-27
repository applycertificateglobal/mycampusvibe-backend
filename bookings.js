const express = require('express');
const router = express.Router();

// In-memory bookings (temporary until DB model added)
const bookings = [];

// GET route
router.get('/', (req, res) => {
  res.json({ message: "Bookings API working" });
});

// POST route
router.post('/', (req, res) => {
  const { name, email, date } = req.body;
  if (!name || !email || !date) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newBooking = { id: Date.now(), name, email, date };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

module.exports = router;
