// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("🚀 Starting backend server...");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model("Form", formSchema);

// ✅ Route for form submission
app.post("/submit", async (req, res) => {
  console.log("📩 Received form data:", req.body);  // log incoming data
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.json({ message: "Form data saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving form data:", err);
    res.status(500).json({ message: "Error saving form data" });
  }
});

// ✅ Start the server
app.listen(5000, () => console.log("🌐 Server running on http://localhost:5000"));
