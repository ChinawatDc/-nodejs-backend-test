const express = require("express");
const userRouter = require("./Routers/user.router");

const router = express.Router();

router.use("/users", userRouter);

module.exports = router;
