const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./src/config/db");
const routes = require("./src/routes"); // Import routes

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use("/api/images", express.static("images"));

// Routes
app.use("/api", routes);

// Root route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// **ซิงค์ฐานข้อมูลก่อนเริ่มเซิร์ฟเวอร์**
sequelize
  .sync({ force: false }) // `force: false` ไม่ลบข้อมูลเก่า
  .then(() => {
    console.log("✅ Database synchronized");
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}/api`);
    });
  })
  .catch((err) => console.error("❌ Error syncing database:", err));
