const express = require("express");
const app = express();
const port = 8080;
const { readdirSync } = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

// Import the database connection
const db = require('./src/config/db');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use("/api/images", express.static("images"));

// Routes
const routes = require('./src/routes');
app.use('/api', routes);

// Root route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is Running on port: http://localhost:${port}`);
});
