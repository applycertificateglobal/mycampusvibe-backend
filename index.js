const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authenticateToken = require('./routes/auth');
const bookingsRoute = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (Use your actual connection string or environment variable)
mongoose.connect(
  process.env.MONGO_URI || 'your_mongodb_connection_string_here',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected'))
 .catch((err) => console.error('MongoDB connection error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String
}));

// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword });
  try {
    await user.save();
    res.send('User registered successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email not found');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('Authorization', `Bearer ${token}`).send('Logged in successfully');
});

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
  res.send('Welcome to the dashboard');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
