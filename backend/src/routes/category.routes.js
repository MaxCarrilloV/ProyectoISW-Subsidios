"use strict";

const express = require("express");
const categoryController = require("../controllers/categoyController.js");

const router = express.Router();

router.post("/create", categoryController.createCategory);

router.get("/getAll", categoryController.getCategory);

module.exports = router;

