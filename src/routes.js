const express = require("express");
const router = express.Router();

const userRoutes = require("./Routers/user.router");
router.use(userRoutes);

module.exports = router;
