const mongoose = require("mongoose");

const InsightSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  topic: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  pestle: String,
  source: String,
  title: String,
  insight: String,
  url: String,
  sector: String,
  city: String,
  swot: String,
});

module.exports = mongoose.model("Insight", InsightSchema);
