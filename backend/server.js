require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to MongoDB
connectDB();

// Express
app.use(express.json()); 

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes will go here later
// app.use('/api/users', require('./routes/users'));
// app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));