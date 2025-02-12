const express = require('express');
const router = express.Router();

const authRouter = require('./Routers/auth.router');
const entityRouter = require('./Routers/book.router');

const { verifyToken } = require("./Middleware/auth");

router.use('/book', verifyToken, entityRouter);
router.use('/guest', authRouter);

module.exports = router;
