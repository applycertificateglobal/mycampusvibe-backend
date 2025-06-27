const express = require('express');
const router = express.Router();
const Booking = require('../model/Booking'); // 👈 new import

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new booking
router.post('/', async (req, res) => {
  const { name, email, date } = req.body;
  if (!name || !email || !date) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const newBooking = new Booking({ name, email, date });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

module.exports = router;
