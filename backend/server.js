require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use('/api/url', require('./routes/urlRoutes'));
const { redirectUrl } = require('./controllers/urlController');
app.get('/:shortId', redirectUrl);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
