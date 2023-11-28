const express = require("express");
const postulanteController = require("../controllers/postulante.controller");
const router = express.Router();

// Define las rutas para los postulantes
router.get("/", postulanteController.getPostulantes);
router.post("/", postulanteController.createPostulante);
router.get("/:id", postulanteController.getPostulanteById);
router.put("/:id", postulanteController.updatePostulante);
router.delete("/:id", postulanteController.deletePostulante);

module.exports = router;