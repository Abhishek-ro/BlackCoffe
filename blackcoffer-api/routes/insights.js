const express = require("express");
const router = express.Router();
const Insight = require("../models/Insight");

router.get("/", async (req, res) => {
  try {
    const searchRegex = new RegExp(req.query.search, "i");
    if (req.query.search) {
      query.$or = [{ title: searchRegex }, { insight: searchRegex }];
    }
    const filters = { ...req.query };
    const data = await Insight.find(filters).limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
 