const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authenticateToken = require('./routes/auth');
const roleCheck = require('./middleware/roleCheck'); // Import roleCheck
const bookingsRoute = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI || 'your_mongodb_connection_string_here',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected'))
 .catch((err) => console.error('MongoDB connection error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}));

// Registration and login routes here...

// Example of a protected route with role check
app.get('/admin', authenticateToken, roleCheck(['admin']), (req, res) => {
  res.send('Welcome, Admin');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
