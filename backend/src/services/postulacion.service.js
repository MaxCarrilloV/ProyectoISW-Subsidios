const Postulacion = require('../models/postulacion.model');
const Postulante = require('../models/postulante.model');
const Subsidio = require('../models/subsidio.js');
const subida = require("../config/Multer.config");

/**
 * Obtiene todas las postulaciones
 */
async function getPostulaciones() {
  try {
    const postulaciones = await Postulacion.find()
    .populate("postulante")
    .populate("subsidio")
    .exec();
    return [postulaciones, null];
  } catch (error) {
    return [null, error];
  }
}

/**
 * Crea una nueva postulación
 * @param {Object} postData - Datos de la nueva postulación
 */
async function createPostulacion(postData,req,res) {
    try {
        // Utiliza el middleware de subida de Multer antes de procesar la apelación
        subida(req, res, async (error) => {
            if (error) {
                return [null, "Error al subir archivos"];
            }
            const { postulante, subsidio,documentos } = postData;
    
            const postulanteExistente = await Postulante.findById(postulante);
            if (!postulanteExistente) {
            return [null, "El postulante no existe"];
            }
              // Validar que el subsidio exista
            const subsidioExistente = await Subsidio.findById(subsidio);
            if (!subsidioExistente) {
            return [null, "El subsidio no existe"];
            }
            // Crear la nueva postulación
            const newPostulacion = new Postulacion({
            postulante,
            subsidio,
            monto,
            documentos: req.files,
            });

            await newPostulacion.save();
            return [savedPostulacion, null];
                });
        } catch (error) {
                throw new Error(error);
    }
}

/**
 * Obtiene una postulación por su ID
 * @param {string} postulacionId - ID de la postulación a buscar
 */
async function getPostulacionById(postulacionId) {
  try {
    const postulacion = await Postulacion.findById(postulacionId);
    return [postulacion, null];
  } catch (error) {
    return [null, error];
  }
}

/**
 * Actualiza una postulación por su ID
 * @param {string} postulacionId - ID de la postulación a actualizar
 * @param {Object} postData - Datos de la postulación actualizada
 */
async function updatePostulacion(postulacionId, postData) {
  try {
    const updatedPostulacion = await Postulacion.findByIdAndUpdate(postulacionId, postData, { new: true });
    return [updatedPostulacion, null];
  } catch (error) {
    return [null, error];
  }
}

/**
 * Elimina una postulación por su ID
 * @param {string} postulacionId - ID de la postulación a eliminar
 */
async function deletePostulacion(postulacionId) {
  try {
    const deletedPostulacion = await Postulacion.findByIdAndRemove(postulacionId);
    return deletedPostulacion;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getPostulaciones,
  createPostulacion,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
};
