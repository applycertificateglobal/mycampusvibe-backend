const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingsRoute = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (🔁 Use your actual connection string or environment variable)
mongoose.connect(
  process.env.MONGO_URI || 'your_mongodb_connection_string_here',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('✅ MongoDB connected'))
 .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/bookings', bookingsRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Backend is live 🚀');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
