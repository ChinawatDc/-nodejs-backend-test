const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  restoreUser,
} = require("../Controllers/user.controllers");

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/restoreUser/:id", restoreUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
