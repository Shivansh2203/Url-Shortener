const Url = require('../models/Url');
const generateId = require('../utils/generateId');
const validateUrl = require('../middlewares/validateUrl');

exports.createShortUrl = async (req, res) => {
  const { longUrl, customAlias } = req.body;

  if (!longUrl || !validateUrl(longUrl)) {
    return res.status(400).json({ error: "Invalid long URL" });
  }

  // Always add https:// if missing
  let urlToSave =
    longUrl.startsWith("http://") || longUrl.startsWith("https://")
      ? longUrl
      : `https://${longUrl}`;

  let shortId = customAlias || generateId();

  try {
    // If custom alias already taken
    const existing = await Url.findOne({ shortId });
    if (existing) {
      return res.status(409).json({ error: "Alias already taken" });
    }

    const newUrl = new Url({ shortId, longUrl: urlToSave });
    await newUrl.save();

    res.json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
      shortId,
      longUrl: urlToSave
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });
    if (!url) return res.status(404).send("URL Not Found");

    url.clicks++;
    await url.save();

    res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

exports.getStats = async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });

    res.json({
      shortId: url.shortId,
      longUrl: url.longUrl,
      clicks: url.clicks,
      createdAt: url.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
