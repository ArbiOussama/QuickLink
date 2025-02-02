const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const shortid = require("shortid");
const URL = require("../models/urlsModel");

const router = express.Router();

// Shorten URL
router.post("/shorten", authMiddleware, async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl.startsWith("http")) return res.status(400).json({ message: "Invalid URL" });

    try {
        const shortId = shortid.generate();
        const newUrl = new URL({ userId: req.user.id, originalUrl, shortId });
        await newUrl.save();
        console.log("New URL saved:", newUrl);

        res.json(newUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's URLs
router.get("/user-urls", authMiddleware, async (req, res) => { // Updated endpoint
    try {
        const urls = await URL.find({ userId: req.user.id });
        console.log("Fetched URLs:", urls);

        res.json(urls);
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.status(500).json({ error: err.message });
    }
});

// Redirect Shortened URL
router.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    try {
        const urlEntry = await URL.findOne({ shortId });
        if (!urlEntry) return res.status(404).json({ message: "URL not found" });
        console.log("Redirecting to:", urlEntry.originalUrl);
        res.redirect(urlEntry.originalUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
