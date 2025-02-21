const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection

console.log("connectDB:", connectDB);

connectDB();

// Routes

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Vernon Village Backend");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
