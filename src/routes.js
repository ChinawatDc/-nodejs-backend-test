const express = require("express");
const userRouter = require("./Routers/user.router");
const authRouter = require("./Routers/auth.router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
