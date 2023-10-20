"use strict";
const express = require("express");
const evaluacionController = require("../controllers/evaluacion.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las evaluaciones
router.get("/", evaluacionController.getEvaluaciones);
router.post("/", authorizationMiddleware.isAdmin, evaluacionController.createEvaluacion);
router.get("/:id", evaluacionController.getEvaluacionById);
router.put("/:id", authorizationMiddleware.isAdmin, evaluacionController.updateEvaluacion);
router.delete("/:id", authorizationMiddleware.isAdmin, evaluacionController.deleteEvaluacion);

module.exports = router;