const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date }  // optional auto-expire
});

// TTL (expireAt automatically deletes after date passes)
UrlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', UrlSchema);
