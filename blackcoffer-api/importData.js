const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Insight = require("./models/Insight");

async function importData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const rawData = fs.readFileSync("data.json");
    const jsonData = JSON.parse(rawData);

    await Insight.deleteMany(); 
    await Insight.insertMany(jsonData);

    console.log("✅ Data imported successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
}

importData();
