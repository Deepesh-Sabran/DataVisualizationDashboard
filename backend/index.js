const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/VisualDashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const InsightSchema = new mongoose.Schema({}, { strict: false });
const Insight = mongoose.model("Insight", InsightSchema);

// API routes
app.get("/api/insights", async (req, res) => {
  try {
    const insights = await Insight.find({});
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
