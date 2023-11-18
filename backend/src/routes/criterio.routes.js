"use strict";
const express = require("express");
const criterioController = require("../controllers/criterio.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los criterios
router.get("/",authorizationMiddleware.isAdmin, criterioController.getCriterios);
router.post("/", authorizationMiddleware.isAdmin, criterioController.createCriterio);
router.put("/:id", authorizationMiddleware.isAdmin, criterioController.updateCriterio);
router.delete("/:id", authorizationMiddleware.isAdmin, criterioController.deleteCriterio);

module.exports = router;
