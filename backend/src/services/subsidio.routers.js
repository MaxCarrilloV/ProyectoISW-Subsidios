"use strict";

const express = require("express");
const subsidioController = require("../controllers/subsidio.controller.js"); 

const router = express.Router();

router.get("/", subsidioController.getSubsidios); 

router.post("/create", subsidioController.createSubsidio); 

router.get("/subsidiocategoria/:id", subsidioController.getSubsidioscategory); 

module.exports = router;
