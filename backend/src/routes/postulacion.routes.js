const express = require("express");
const postulacionController = require("../controllers/postulacion.controller");
const router = express.Router();

// Define las rutas para las postulaciones
router.get("/", postulacionController.getPostulaciones);
router.post("/", postulacionController.createPostulacion);
router.get("/:id", postulacionController.getPostulacionById);
router.put("/:id", postulacionController.updatePostulacion);
router.delete("/:id", postulacionController.deletePostulacion);

module.exports = router;
