const express = require('express');
const router = express.Router();
const { createShortUrl, redirectUrl, getStats } = require('../controllers/urlController');

// Create short URL
router.post('/shorten', createShortUrl);

// Redirect
router.get('/:shortId', redirectUrl);

// Stats
router.get('/:shortId/stats', getStats);

module.exports = router;
