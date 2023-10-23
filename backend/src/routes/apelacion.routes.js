//Rutas de Apelacion
"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el controlador de Apelacion
const apelacionController = require("../controllers/apelacion.controller");

// Importa el middleware de autorización
const authorizationMiddleware = require("../middlewares/authorization.middleware");

// Importa el middleware de autenticación
const authenticationMiddleware = require("../middlewares/authentication.middleware");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las apelaciones
router.get("/", authorizationMiddleware.isAdmin, apelacionController.getApelaciones);
router.post("/", apelacionController.createApelacion);
router.get("/:id", authorizationMiddleware.isAdmin, apelacionController.getApelacionById);
router.get("/postulacion/:id", authorizationMiddleware.isAdmin, apelacionController.getApelacionByPostulacion);

// Exporta el enrutador de apelaciones
module.exports = router;


