const express = require("express");
const User = require("../Models/User");

const router = express.Router();

// สร้าง User
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ดึง Users ทั้งหมด
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      message: "successful",
      body: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
