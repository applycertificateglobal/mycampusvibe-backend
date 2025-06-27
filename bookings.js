const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Booking schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// GET route for testing
router.get('/', (req, res) => {
  res.json({ message: "Bookings API working" });
});

// POST route to create new booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
});

module.exports = router;
