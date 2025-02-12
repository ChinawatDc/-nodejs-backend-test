const express = require("express");
const bookController = require("../Controllers/book.controllers");
const route = express.Router();

route.get("/", bookController.getList);
route.get("/:name", bookController.getbyname);

module.exports = route;
