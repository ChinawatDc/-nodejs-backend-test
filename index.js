const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const sequelize = require("./src/config/db");
const routes = require("./src/routes");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use("/api/images", express.static("images"));

// เปลี่ยนเส้นทางให้ Swagger UI ใช้ /api/swagger
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api", routes);

// Serve WelcomeMessage.html for /api
app.get("/api", (req, res) => {
  const filePath = path.join(__dirname, "public/html/WelcomeMessage.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading HTML file:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "text/html");
    res.send(data);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Sync database before starting server
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ Database synchronized");
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}/api`);
    });
  })
  .catch((err) => console.error("❌ Error syncing database:", err));
