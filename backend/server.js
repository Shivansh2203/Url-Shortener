require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware (CORS fix)
app.use(cors({
  origin: ["http://localhost:5173", "https://url-shortener-five-lake.vercel.app"]
}));

app.use(express.json());

// Routes
app.use('/api/url', require('./routes/urlRoutes'));
const { redirectUrl } = require('./controllers/urlController');
app.get('/:shortId', redirectUrl);

// Root route (fix for "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
