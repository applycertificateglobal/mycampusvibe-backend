const roleCheck = require('./middleware/roleCheck');

// Example of a protected route
app.get('/admin', authenticateToken, roleCheck(['admin']), (req, res) => {
  res.send('Welcome, Admin');
});
