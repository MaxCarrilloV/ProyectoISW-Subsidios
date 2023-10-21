"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

//Enrutador de evaluaciones
const evaluacionRoutes = require("./evaluacion.routes.js");

//Enrutador de motivos de rechazo
const motivorechazoRoutes = require("./motivorechazo.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las evaluaciones /api/evaluaciones
router.use("/evaluacion", authenticationMiddleware, evaluacionRoutes);

// Define la ruta para los motivos de rechazo /api/motivorechazo
router.use("/motivorechazo", authenticationMiddleware, motivorechazoRoutes);

// Exporta el enrutador
module.exports = router;
