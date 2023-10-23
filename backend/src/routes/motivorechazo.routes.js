//Ruta de rechazo
"use strict";

const express = require("express");
const MotivoRechazoController = require("../controllers/motivorechazo.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isAdmin, MotivoRechazoController.getMotivoRechazos);
router.get("/:id", MotivoRechazoController.getMotivoRechazo);
router.post("/",authorizationMiddleware.isAdmin, MotivoRechazoController.createMotivoRechazo);
 
module.exports = router;