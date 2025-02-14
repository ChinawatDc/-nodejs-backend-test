const express = require("express");
const {
  register,
  login,
  requestPasswordChange,
  changePassword,
} = require("../Controllers/auth.controllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/request-otp", requestPasswordChange);
router.post("/change-password", changePassword);

module.exports = router;
